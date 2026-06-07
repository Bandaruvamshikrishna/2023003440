const API_ENDPOINT = "http://4.224.186.213/evaluation-service/notifications";

// REPLACE THIS with the actual token you received from your setup task
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YmFuZGFydThAZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTcxMDIsImlhdCI6MTc4MDgxNjIwMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU1OTEwMmYyLTMyNTctNGJkOS1hZmZlLTdmZjU0M2VlYzVjNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJhbmRhcnUgdmFtc2hpa3Jpc2huYSIsInN1YiI6IjNjZTM2MzRmLWExMzAtNGIxNy04YjFmLWIzYWRmODQ3NWIzZCJ9LCJlbWFpbCI6InZiYW5kYXJ1OEBnaXRhbS5pbiIsIm5hbWUiOiJiYW5kYXJ1IHZhbXNoaWtyaXNobmEiLCJyb2xsTm8iOiIyMDIzMDAzNDQwIiwiYWNjZXNzQ29kZSI6IndnS3RnWiIsImNsaWVudElEIjoiM2NlMzYzNGYtYTEzMC00YjE3LThiMWYtYjNhZGY4NDc1YjNkIiwiY2xpZW50U2VjcmV0IjoiYW5SRW5oQU1SWGFTeXRSWiJ9.i8gLUuC2e2BHCRHbXiS9aJdr9hPn9jLXUchzFkpwZRI"; 

const getPriority = (type) => {
    const levels = { "Placement": 3, "Result": 2, "Event": 1 };
    return levels[type] || 0;
};

const sortNotifications = (a, b) => {
    const priorityDifference = getPriority(b.Type) - getPriority(a.Type);
    
    if (priorityDifference !== 0) {
        return priorityDifference;
    }
    
    return new Date(b.Timestamp) - new Date(a.Timestamp);
};

fetch(API_ENDPOINT, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}` // Passing the token
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data || !data.notifications) {
            throw new Error("No notifications found in the response.");
        }
        
        const sortedData = data.notifications.sort(sortNotifications);
        const top10 = sortedData.slice(0, 10);
        
        console.log("=== TOP 10 PRIORITY NOTIFICATIONS ===");
        console.table(top10);
    })
    .catch(error => {
        console.error("Failed to fetch notifications:", error.message);
    });