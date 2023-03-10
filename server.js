
const Sequelize = require('sequelize');
const {UUID, UUIDV4, STRING} = Sequelize;
const express = require("express");
const app = express();
const path = require("path")

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_hr_2207')
app.use(express.json());
app.use('/dist', express.static('dist'));//to use files from dist ie webpack and react

app.get('/', async(req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


app.get('/api/users', async(req, res, next)=>{
    try{
        res.send(await User.findAll())
    }catch(err){
        next(err)
    }
})

app.get('/api/departments', async(req, res, next)=>{
    try{
        res.send(await Department.findAll())
    }catch(err){
        next(err)
    }
})

const User = conn.define('user', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})
app.post('/api/users', async(req, res, next)=>{
    try{
        res.status(201).send(await User.create(req.body))
    }catch(err){
        next(err)
    }
})


const Department = conn.define('department', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

User.belongsTo(Department);
Department.hasMany(User);

const init = async()=>{
    try{
        await conn.sync({force:true});
        const [moe, lucy, larry, ethyl, hr, engineering, finance] = await Promise.all([
            User.create({name: 'moe'}),
            User.create({name: 'lucy'}),
            User.create({name: 'larry'}),
            User.create({name: 'ethyl'}),
            Department.create({name: 'hr'}),
            Department.create({name: 'engineering'}),
            Department.create({name: 'finance'})
            ]);
            
            lucy.departmentId = engineering.id;
            ethyl.departmentId = engineering.id;
            larry.departmentId = hr.id;
            
            await Promise.all([
                lucy.save(),
                ethyl.save(),
                larry.save()
                ]);
                
                
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(err){
        console.log(err);
    }
};

init();