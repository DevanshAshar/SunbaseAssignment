const express = require('express');
const app = express();
const cors=require('cors')
app.use(cors())
app.use(express.json())
const PORT = 5000;
app.post('/login',async(req,res)=>{
    try {
        const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    req.body
                ),
            });
            const data = await response.json();
            console.log(data)
            res.status(200).json({token:data.access_token})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
})
app.get('/custList',async(req,res)=>{
    try {
        const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
                method: 'GET',
                headers: {
                    'Authorization': req.headers.authorization,
                },
            });
            const data = await response.json();
            res.status(200).json({data})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
})
app.get('/custData/:customerId',async(req,res)=>{
    try {
        const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
                method: 'GET',
                headers: {
                    'Authorization': req.headers.authorization,
                },
            });
            const data = await response.json();
            const customer = data.find(cust => cust.uuid === req.params.customerId);
            res.status(200).json({customer})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
})
app.post('/addCust', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const body = req.body;
        const data=await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
        res.status(201).json({ data });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
app.post('/editCust', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const body = req.body;
        const data=await fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${body.uuid}`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
        res.status(201).json({ data });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
app.post('/deleteCust',async(req,res)=>{
    try {
        const token = req.headers.authorization;
        const body = req.body;
        const data=await fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${body.uuid}`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
        res.status(201).json({ data });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
})
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});