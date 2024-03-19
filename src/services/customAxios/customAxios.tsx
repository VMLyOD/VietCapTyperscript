import axios from "axios";

const InstanceAxios = axios.create({
  baseURL: "https://mt-qc.vietcap.int/",
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYWNjb3VudE5vIjoiMDY4Qzk1OTU5NSIsInBob25lX251bWJlciI6IjA3ODYyMTU2NjYiLCJjbGllbnRfdHlwZSI6MSwidXVpZCI6IjZkZjUwOWU2LWVjZjktNGEzZC1hNzMzLWUyYWVmOThiMzZjOSIsImVtYWlsIjoidHJ1bmcubGVAeW9wbWFpbC5jb20iLCJjdXN0b21lck5hbWUiOiJUcnVuZyBsZSIsImNsaWVudF9pZCI6ImE2NzA5MTRjLTg5NjQtNGIyYy1hMjg5LTZkZTRkNWI5ZDJjNCIsInVzZXJuYW1lIjoiMDY4Yzk1OTU5NSIsImlhdCI6MTcwOTUyNjI2MywiZXhwIjoxNzA5NTU1MDYzfQ.ZYskQWxJ23SsGunAdvkL4FuYL0FwUlgO0AyDsqkab14SIcV8bxZ3ke8cSVeeqM4iHRG_Sc1NhD7NvlIzuCbPgRTgW3_lvK3z0P61yOpIXl7wfmVvZP9etOM1KWRvTsmbCr3r3IJCxIGe1HvdcdUTi2ritBjiSROLSV24oYnc4IzwSUYkFbT30rVJE09kqK6d8CWDcUUb1VIfwe8VG1YVDEVyIvRqCZzf8BXypvud5EGXH4qGQvZyQ84ufyL9y_CAk1Vc_5cJt8uOuBMwhwVl0HiuOtNg4RgDBAM41X-utIt852_qkubnVm5mRHSVqqFPlbScUmOqJp6KIG7NXMmR-g",
    "Cache-Control": "no-cache",
  },
});

InstanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default InstanceAxios;
