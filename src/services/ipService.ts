// Using Ip Api
// docs reference in https://ip-api.com/docs/api:json

type IpApiResponse = {
   query: string;
   status: "success" | "fail";
   message?: string; // Present only if status is "fail"
   continent: string;
   continentCode: string;
   country: string;
   countryCode: string;
   region: string;
   regionName: string;
   city: string;
   zip: string;
   lat: number;
   lon: number;
   timezone: string;
   offset: number;
   currency: string;
   isp: string;
   org: string;
   as: string;
};

export const getIpInfo = async (ip: string): Promise<IpApiResponse | null> => {
   const apiUrl = `http://ip-api.com/json/${ip}`;

   if (!isValidIp(ip)) {
      console.error("Invalid IP address");
      return null;
   }

   try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
         throw new Error("Failed to fetch IP information");
      }

      const data: IpApiResponse = await response.json();

      if (data.status === "fail") {
         throw new Error("Failed to fetch IP information");
      }
      return data;
   } catch (error) {
      console.error("Error fetching IP info:", error);
      return null;
   }
};

function isValidIp(ip: string): boolean {
   const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
   return ipRegex.test(ip);
}
