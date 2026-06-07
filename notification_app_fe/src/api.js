const API_ENDPOINT = "http://4.224.186.213/evaluation-service/notifications";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YmFuZGFydThAZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTcxMDIsImlhdCI6MTc4MDgxNjIwMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU1OTEwMmYyLTMyNTctNGJkOS1hZmZlLTdmZjU0M2VlYzVjNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJhbmRhcnUgdmFtc2hpa3Jpc2huYSIsInN1YiI6IjNjZTM2MzRmLWExMzAtNGIxNy04YjFmLWIzYWRmODQ3NWIzZCJ9LCJlbWFpbCI6InZiYW5kYXJ1OEBnaXRhbS5pbiIsIm5hbWUiOiJiYW5kYXJ1IHZhbXNoaWtyaXNobmEiLCJyb2xsTm8iOiIyMDIzMDAzNDQwIiwiYWNjZXNzQ29kZSI6IndnS3RnWiIsImNsaWVudElEIjoiM2NlMzYzNGYtYTEzMC00YjE3LThiMWYtYjNhZGY4NDc1YjNkIiwiY2xpZW50U2VjcmV0IjoiYW5SRW5oQU1SWGFTeXRSWiJ9.i8gLUuC2e2BHCRHbXiS9aJdr9hPn9jLXUchzFkpwZRI"; // Replace with your actual token

export const fetchNotifications = async (params = {}) => {
    const url = new URL(API_ENDPOINT);
    
    if (params.limit) url.searchParams.append('limit', params.limit);
    if (params.page) url.searchParams.append('page', params.page);
    if (params.notification_type) url.searchParams.append('notification_type', params.notification_type);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AUTH_TOKEN}`
        }
    });

    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.notifications || [];
};