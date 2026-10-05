const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


//ROUTES 

//create users
app.post("/users", async (req, res) => {
    try {
        const { email, password_hash, role } = req.body;

        const result = await pool.query(
            "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *",
            [email, password_hash, role]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);

    }
});

//create student profile

app.post("/student-profiles", async (req, res) => {

    try {

        const {
            user_id,
            student_number,
            first_name,
            last_name,
            course,
            year_level
        } = req.body;

        const result = await pool.query(
            "INSERT INTO student_profiles (user_id, student_number , first_name, last_name, course, year_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [user_id, student_number, first_name, last_name, course, year_level]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

//create admin prfiles


app.post("/admin-profiles", async (req, res) => {

    try {
        const {
            
            admin_id,
            user_id,
            employee_number,
            office
        } = req.body;
        const result = await pool.query(
            "INSERT INTO admin_profiles(admin_id, user_id, employee_number, office) VALUES($1,$2,$3,$4) RETURNING *",
            [admin_id,user_id, employee_number, office]
        );

        res.json(result.rows[0]); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

//create application

app.post("/applications", async (req, res) => {

    try {
        const {
            application_number,
            student_id,
            handled_by,
            type,
            status,
            remarks,

        } = req.body;

        const result = await pool.query(
            `INSERT INTO applications (application_number, student_id, handled_by, type, status, remarks) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
            [application_number, student_id, handled_by, type, status, remarks]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

//create upploaded files

app.post("/uploaded-files" , async(req, res) => {
    try{
        const{
          
            application_id,
            file_type,
            file_path,
            original_name,
            
        } = req.body;
        const result = await pool.query("INSERT INTO uploaded_files (application_id, file_type, file_path, original_name) VALUES ($1,$2,$3,$4) RETURNING *", 
            [application_id, file_type, file_path, original_name]);

            res.json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(500).json({ error: err.message});
    }
});


//create card 

app.post("/cards" , async(req,res) => {
    try{
        const{
            student_id,
            application_id,
            card_number,
            status,
            expires_at


        } = req.body;

        const result = await pool.query("INSERT INTO cards(student_id, application_id, card_number, status, expires_at ) VALUES($1, $2, $3, $4,$5)", 
            [student_id, application_id, card_number, status, expires_at]
        );

        res.json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(500).json({ error: err.message});
    }
});

app.post("/reissuance-request", async(req, res) =>{
    try{
        const {
            card_id,
            new_application_id,
            reason,
            status,

        } = req.body;

        const result = await pool.query("INSERT INTO reissuance_requests(card_id, new_application_id, reason, status ) VALUES($1,$2,$3,$4) RETURNING * ",
            [card_id,new_application_id,reason,status]
        );
        res.json(result.rows[0]);
    }catch(err){
        console.error(err.message);

        res.status(500).json({error : err.message});
        
    }
});

app.post("/status-history", async(req, res) =>{
    try{

        const {
            application_id,
            old_status,
            new_status,
            changed_by,
            remarks
            
        } = req.body;

        const result = await pool.query("INSERT INTO status_history(application_id, old_status, new_status, changed_by, remarks) VALUES($1,$2,$3,$4,$5) RETURNING *", 
            [application_id, old_status, new_status, changed_by, remarks]);

            res.json(result.rows[0]);

    }catch(err){
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
});
//get users

app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);

    }
});


//get studen-profiles

app.get("/student-profiles", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM student_profiles");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});


//get admin-profiles 

app.get("/admin-profiles", async(req, res) =>{
    
    try{
    const result = await pool.query("SELECT * FROM admin_profiles");
    res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json({ error: err.message});
    }
});


// get applications

app.get("/applications", async(req, res) =>{
    try{

        const result = await pool.query("SELECT * FROM applications");
        res.json(result.rows);
    }catch{
        console.error(err.message);
        res.status(500).json({ error: err.message});
    }
});


// get uploaded-files
app.get("/uploaded-files", async(req, res) =>{
    try{

        const result = await pool.query("SELECT * FROM uploaded_files");
        res.json(result.rows);
    }catch{
        console.error(err.message);
        res.status(500).json({ error: err.message});
    }
});

//get cards

app.get("/cards", async(req, res) =>{
    try{

        const result = await pool.query("SELECT * FROM cards");
        res.json(result.rows);
    }catch{
        console.error(err.message);
        res.status(500).json({ error: err.message});
    }
});

//get reissuance- requresat

app.get("/reissuance-requests", async(req, res) =>{
    try{

        const result = await pool.query("SELECT * FROM reissuance_requests");
        res.json(result.rows);
    }catch{
        console.error(err.message);
        res.status(500).json({ error: err.message});
    }
});

//get status-histryy

app.get("/status-history", async(req, res) =>{
    try{

        const result = await pool.query("SELECT * FROM status_history");
        res.json(result.rows);
    }catch{
        console.error(err.message);
        res.status(500).json({ error: err.message});
    }
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});


