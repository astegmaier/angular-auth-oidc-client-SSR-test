using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace debug_test.Controllers
{
    [Route("[controller]")]
    public class B2CDiscoveryController : Controller
    {
        [HttpGet("[action]")]
        public JsonResult Keys()
        {
           var client = new HttpClient();
           var jwks = client.GetStringAsync("https://login.microsoftonline.com/b4cffd0a-6ca3-4dae-bee6-a11da7a5d2cd/discovery/v2.0/keys"); //Saleslists
        //    var jwks = client.GetStringAsync("https://login.microsoftonline.com/775527ff-9a37-4307-8b3d-cc311f58d925/discovery/v2.0/keys"); //Fabrikam
           return Json(JObject.Parse(jwks.Result));
        }

        [HttpGet("[action]")]
        public JsonResult Configuration()
        {
            var client = new HttpClient();
            // var configRaw = client.GetStringAsync("https://login.microsoftonline.com/saleslists.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_mysigninpolicy");
            var configRaw = client.GetStringAsync("https://login.microsoftonline.com/saleslists.onmicrosoft.com/v2.0/.well-known/openid-configuration");
            // var configRaw = client.GetStringAsync("https://login.microsoftonline.com/fabrikamb2c.onmicrosoft.com/v2.0/.well-known/openid-configuration");
            var config = JObject.Parse(configRaw.Result);
            config["jwks_uri"] = "http://localhost:5000/b2cdiscovery/keys";
            // config["authorization_endpoint"] = "https://login.microsoftonline.com/tfp/fabrikamb2c.onmicrosoft.com/b2c_1_susi/oauth2/v2.0/authorize";
            return Json(config);
        }
    }
}