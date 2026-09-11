// Polyfill WebSocket for Node 20 (Supabase requirement)
global.WebSocket = require('ws');
const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');

// Ensure environment variables are loaded
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase Environment Variables!");
  console.error("Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env.local file.");
  process.exit(1);
}

// Create a Supabase client with the SERVICE ROLE KEY (Bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=== 🛡️ Create Dedicated Admin User ===\n");

rl.question('Enter Admin Email: ', (email) => {
  rl.question('Enter Admin Password: ', async (password) => {
    rl.question('Enter Admin Full Name: ', async (fullName) => {
      
      try {
        console.log("\n⏳ Creating user in Supabase Auth...");
        
        // 1. Create the user in auth.users
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true, // Auto-confirm the email
          user_metadata: {
            full_name: fullName
          }
        });

        if (authError) throw authError;

        console.log("✅ Auth user created! ID:", authData.user.id);
        
        // Note: If you have a trigger that automatically inserts into `profiles` upon user creation,
        // it might have already created the profile. We just need to update it to ADMIN.
        
        console.log("⏳ Setting user role to ADMIN in profiles table...");
        
        // 2. Update the profile role to ADMIN
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            role: 'ADMIN',
            full_name: fullName
          })
          .eq('id', authData.user.id);

        if (profileError) {
          // Sometimes triggers take a millisecond, let's retry insert if update fails
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: authData.user.id,
              email: email,
              full_name: fullName,
              role: 'ADMIN'
            }]);
            
          if (insertError) throw insertError;
        }

        console.log("✅ Admin user setup completed successfully!");
        console.log("\n🎉 You can now login at http://localhost:3000/admin");

      } catch (error) {
        console.error("\n❌ Error creating admin user:", error.message);
      } finally {
        rl.close();
      }
    });
  });
});
