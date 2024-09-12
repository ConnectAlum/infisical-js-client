import { createInfisicalClient } from "@/client";

const foo = async () => {
    const infisical = createInfisicalClient({
        siteUrl: "https://env.connectalum.dev",
        auth: {
            universalAuth: {
                clientId: "a9079a5a-d631-4d89-b193-49468464038f",
                clientSecret: "724453deb17d21336dffb4ea60aff9cae1d4504776791d3dce6f5e37e9f56bb2"
            }
        }
    });

    // console.log(await infisical.getSecret({
    //     secretName: "NEXT_PUBLIC_SUPABASE_URL",
    //     workspaceId: "a1bf48e8-ad0d-473e-94bd-a2796b306937",
    //     workspaceSlug: "connect-6-gq-m",
    //     environment: "dev"
    // }))

    console.log(await infisical.listSecrets({
        recursive: true,
        workspaceId: "a1bf48e8-ad0d-473e-94bd-a2796b306937",
        workspaceSlug: "connect-6-gq-m",
        environment: "dev",
    }));
}

foo();