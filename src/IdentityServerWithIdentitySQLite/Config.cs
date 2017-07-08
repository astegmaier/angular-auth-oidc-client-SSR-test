// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using IdentityServer4.Models;
using System.Collections.Generic;

namespace QuickstartIdentityServer
{
    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // client credentials client
            return new List<Client>
            {
                new Client
                {
                    ClientName = "9d013e00-91df-487f-b260-c33e77dfb844",
                    ClientId = "9d013e00-91df-487f-b260-c33e77dfb844",
                    AccessTokenType = AccessTokenType.Reference,
                    AccessTokenLifetime = 15,// 120 seconds, default 60 minutes
                    IdentityTokenLifetime = 5,
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = new List<string>
                    {
                        "http://localhost:5000"

                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:5000/unauthorized"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost:5000",
                        "http://localhost:5000"
                    },
                    AllowedScopes = new List<string>
                    {
                        "openid",
                        "role",
                        "profile",
                        "email"
                    }
                }
            };
        }
    }
}