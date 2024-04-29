import { Router, Context, qrcode } from "../deps.ts";
import db from "../config/db.ts";

const router = new Router();
function dataURLtoBlob(dataUrl: string): Blob {
    // Decode the dataURL
    const binary: string = atob(dataUrl.split(',')[1]);

    // Create 8-bit unsigned array
    const array: number[] = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }

    // Return our Blob object
    return new Blob([new Uint8Array(array)], {
        type: 'image/png',
    });
}

router.get("/api/genqrcode", async (context: Context) => {
    try {
        
        const result = await db.queryObject('SELECT url_temp FROM customers ORDER BY RANDOM() LIMIT 1');
        const urlData = result.rows[0].url_temp;
        const base64Image = await qrcode(urlData);
        const blob = dataURLtoBlob(base64Image);

        context.response.body = blob;
        context.response.headers.set('Content-Type', 'image/png');
        context.response.headers.set("Content-Disposition", 'attachment; filename=qrcode.png');
    } catch (error) {
        console.error('Error ', error);
        context.response.status = 500; 
        context.response.body = { error: 'Internal server error' };
    }
});

router.post("/api/generate", async (context) => {
    try {
        
        let First_Name: string = generateRandomName();
        let Last_Name: string = generateRandomName();
        let Full_Name: string = First_Name + Last_Name;
        let URL_Temp = `https://randomurl.com/${Full_Name}`;
        let Email: string = generateRandomEmail(Full_Name);
        let Date_of_Birth: string = generateRandomDate();
        let Gender: string = generateRandomGender();
        let Country: string = generateRandomCountry();
        let Annual_Income: number = generateRandomIncome();
        let Registration_Date: string = generateRandomDate();
        let Purchase_Type: string = generateRandomPurchaseType();

        try {
            await db.queryArray("INSERT INTO customers (first_name, last_name, email, date_of_birth, gender, country, annual_income, registration_date, purchase_type, url_temp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [First_Name, Last_Name, Email, Date_of_Birth, Gender, Country, Annual_Income, Registration_Date, Purchase_Type, URL_Temp]);
        } catch (insertError) {
            console.error('Error inserting data:', insertError);
        }
        
        context.response.body = { message: `Successfully insert` };
        
    } catch (error) {
        console.error('Error ', error);
        context.response.status = 500; 
        context.response.body = { error: 'Internal server error' };
    }
});

router.get("/api/query", async (context) => {
    try {
        const result = await db.queryObject('SELECT * FROM customers');
        context.response.body = result.rows;
    } catch (error) {
        console.error('Error ', error);
        context.response.status = 500; 
        context.response.body = { error: 'Internal server error' };
    }
});
router.delete("/api/remove", async (context) => {
    try {
        const result = await db.queryObject('DELETE FROM customers');
        context.response.body = {
            status: "success",
            data: result.rows 
        };
    } catch (error) {
        console.error('Error ', error);
        context.response.status = 500; 
        context.response.body = { error: 'Internal server error' };
    }
});

function generateRandomName(): string {
    const names: string[] = [
        "Alice", "Bob", "Charlie", "David", "Eva",
        "Olivia", "Liam", "Emma", "Noah", "Ava",
        "Sophia", "William", "Isabella", "James", "Charlotte",
        "Benjamin", "Amelia", "Lucas", "Mia", "Henry",
        "Harper", "Ethan", "Evelyn", "Alexander", "Abigail",
        "Mason", "Emily", "Ella", "Daniel",
        "Elizabeth", "Jacob", "Camila", "Logan", "Luna",
        "Jackson", "Sofia", "Sebastian", "Avery", "Jack",
        "Scarlett", "Aiden", "Victoria", "Owen", "Madison",
        "Samuel", "Luna", "Matthew", "Grace", "Joseph",
        "Chloe", "Levi", "Penelope", "Mateo", "Layla"
    ];
    return names[Math.floor(Math.random() * names.length)];
}

function generateRandomEmail(firstName: string): string {
    return `${firstName.toLowerCase()}@example.com`;
}

function generateRandomDate(): string {
    const start = new Date(1970, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

function generateRandomGender(): string {
    const genders: string[] = ["Male", "Female", "Other"];
    return genders[Math.floor(Math.random() * genders.length)];
}

function generateRandomCountry(): string {
    const countries: string[] = ["USA", "Canada", "UK", "Australia", "Germany"];
    return countries[Math.floor(Math.random() * countries.length)];
}

function generateRandomIncome(): number {
    return Math.floor(Math.random() * 100000) + 20000; // Random income between 20,000 and 120,000
}

function generateRandomPurchaseType(): string {
    const types: string[] = [
        "Electronics", "Clothing", "Groceries", "Books", "Others",
        "Home and Garden", "Toys and Games", "Sports Equipment", "Health and Beauty",
        "Automotive", "Jewelry", "Office Supplies", "Pet Supplies", "Footwear",
        "Music and Movies", "Art and Craft Supplies", "Kitchenware", "Travel Accessories",
        "Fitness Gear", "Digital Services"
    ];
    return types[Math.floor(Math.random() * types.length)];
}

export default router;
