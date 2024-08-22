const db = require('../models');
const bcrypt =  require('bcrypt'); 
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Username, email, and password are required!' });
    }
    try {
        const existUser = await db.User.findOne({ where:  {email: req.body.email} });
        if (existUser) {
            return res.status(409).json({ error: 'User already exists!' });
        }
        await bcrypt.hash(req.body.password, 10).then((hash)=>
        {
            const user = db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            res.status(201).json(user);
        })

    } catch (err) {
        res.status(400).json({ error: err.message || 'Registration failed' });
    }
};


const privateKey = "This is a pirivate key jovn,lm!q :;nkvqubj vfqjio"

const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Email and password are required!' });
    }
    try {
        const user = await db.User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(400).json({ error: 'Invalide Email Or Password' });
        bcrypt.compare(req.body.password, user.password).then((same)=>
        {
            if(same)
            {
                let token = jwt.sign({id: user.id, username:user.username, role:'userrole'}, privateKey,
                    {expiresIn:'1h'})
                res.status(200).json({token: token});
            }
            else
            {
                return res.status(400).json({ error: 'Invalide Email Or Password' });
            }
        })
    } catch (err) {
        res.status(400).json({ error: err.message || 'Login failed' });
    }
};



const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message || 'Failed to retrieve users' });
    }
};



const updateUser = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: 'User ID is required!' });
    try {
        const [updated] = await db.User.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message || 'Update failed' });
    }
};


const deleteUser = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: 'User ID is required!' });
    try {
        const deleted = await db.User.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message || 'Delete failed' });
    }
};



module.exports = 
{
    login,
    register,
    getAllUsers,
    updateUser,
    deleteUser
}