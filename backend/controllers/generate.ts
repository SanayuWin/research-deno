import { Status } from "../deps.ts";
import client from "../config/db.ts";

export async function generate(ctx: any) {

    try {
        // Assuming numRows represents a count of some operation
        const numRows = ctx.request.url.searchParams.get('id') ? parseInt(ctx.request.url.searchParams.get('id')) : 1;
        let successCount = 0;
        // var dataRow = {};
        for(let i = 0; i < numRows; i++){
            var firstName = generateRandomName();
            var lastName = generateRandomName();
            var fullName = firstName + lastName;
            var dataRow = {
                "First_Name": firstName,
                "Last_Name": lastName,
                "Email": generateRandomEmail(fullName),
                "Date_of_Birth": generateRandomDate(),
                "Gender": generateRandomGender(),
                "Country": generateRandomCountry(),
                "Annual_Income": generateRandomIncome(),
                "Registration_Date": generateRandomDate(),
                "Purchase_Type": generateRandomPurchaseType()
            };

            try {
                const query = `
                INSERT INTO customers (
                    first_name, last_name, email, date_of_birth, gender, 
                    country, annual_income, registration_date, purchase_type
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9
                )
                `;
                // await client.execute(query, Object.values(dataRow));
                await client.queryObject(query, Object.values(dataRow));
                successCount++;
            } catch (insertError){
                console.error('Error inserting data:', insertError);
            }

        }

        ctx.response.status = Status.OK;
        ctx.response.body = {
            message: `Successfully processeds ${successCount} records.`,
        }
    }catch (error) {
        console.error('Error reading data.json:', error);
        ctx.response.status = Status.InternalServerError;
        ctx.response.body = { error: 'Internal Server Error' };
    }
    
}

export async function previewData(ctx: any) {
    try {
        const result  = await client.queryObject('SELECT * FROM customers');
        const rows = result.rows;

        ctx.response.status = Status.OK;
        ctx.response.type = "json";
        ctx.response.headers.set("Content-Type", "application/json");
        ctx.response.body = rows
        
    } catch (error) {
        console.error(error);
        ctx.response.status = Status.InternalServerError;
        ctx.response.type = "json";
        ctx.response.body = { error: 'Internal Server Error' };
    }
}

export async function removeData(ctx: any) {
    try {
        const rows  = await client.queryObject('DELETE FROM customers');
        ctx.response.status = Status.OK;
        ctx.response.type = "json";
        ctx.response.headers.set("Content-Type", "application/json");
        ctx.response.body = {
            status: "success",
            data: { rows }
        } 
    } catch (error) {
        console.error(error);
        ctx.response.status = Status.InternalServerError;
        ctx.response.type = "json";
        ctx.response.body = { error: 'Internal Server Error' };
    }
}

function generateRandomName() {
    const names = [
        "Alice", "Bob", "Charlie", "David", "Eva",
        "Olivia", "Liam", "Emma", "Noah", "Ava",
        "Sophia", "William", "Isabella", "James", "Charlotte",
        "Benjamin", "Amelia", "Lucas", "Mia", "Henry",
        "Harper", "Ethan", "Evelyn", "Alexander", "Abigail",
        "Mason", "Emily", "Michael", "Ella", "Daniel",
        "Elizabeth", "Jacob", "Camila", "Logan", "Luna",
        "Jackson", "Sofia", "Sebastian", "Avery", "Jack",
        "Scarlett", "Aiden", "Victoria", "Owen", "Madison",
        "Samuel", "Luna", "Matthew", "Grace", "Joseph",
        "Chloe", "Levi", "Penelope", "Mateo", "Layla"
    ];
    return names[Math.floor(Math.random() * names.length)];
}

function generateRandomEmail(firstName) {
    return `${firstName.toLowerCase()}@example.com`;
}
function generateRandomDate() {
    const start = new Date(1970, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}
function generateRandomGender() {
    const genders = ["Male", "Female", "Other"];
    return genders[Math.floor(Math.random() * genders.length)];
}

function generateRandomCountry() {
    const countries = ["USA", "Canada", "UK", "Australia", "Germany"];
    return countries[Math.floor(Math.random() * countries.length)];
}
  

function generateRandomIncome() {
    return Math.floor(Math.random() * 100000) + 20000; // Random income between 20,000 and 120,000
}
  
function generateRandomPurchaseType() {
    const types = [
        "Electronics", "Clothing", "Groceries", "Books", "Others",
        "Home and Garden", "Toys and Games", "Sports Equipment", "Health and Beauty",
        "Automotive", "Jewelry", "Office Supplies", "Pet Supplies", "Footwear",
        "Music and Movies", "Art and Craft Supplies", "Kitchenware", "Travel Accessories",
        "Fitness Gear", "Digital Services"
    ];
    return types[Math.floor(Math.random() * types.length)];
}