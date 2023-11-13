const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const secret = process.env.JWT_SECRET;
let members = [];
const { Member } = require('../models');

// 비밀번호 암호화
const create_hash = async (password, saltRound) => {
    let hashed = await bcrypt.hash(password, saltRound);
    console.log(`${password} : ${hashed}`);
    return hashed;
};

// 회원가입 http://{{host}}/members/sign-up
router.post('/sign-up', async (req, res)=>{
    const new_member = req.body;
    console.log(new_member);

    new_member.password = await create_hash(new_member.password, 10);

    try{
        const result = await Member.create(new_member);
        res.send({ success: true, data:result });
    } catch(error){
        res.send({ success: false, message: error, error: error });
    };
});

//회원 로그인 http://{{host}}/members/sign-in
router.post('/sign-in', async (req, res)=>{
    const { member_id, password } = req.body;
    const options = { //입력한 아이디와 db에 저장된 아이디가 같은 회원의 'id', 'password'를 options에 담음
        attributes: ['id','password'],
        where: { member_id:member_id } //모델속성:키값
    }
    const result = await Member.findOne(options);
    console.log(result);

    if(result){  //회원이 입력한 비밀번호와 db에 저장된 token 비교
        const compared = await bcrypt.compare(password, result.password);
        console.log(`${password} : ${result.password} : ${compared}`);
        if(compared){ //토큰 발행
            const token = jwt.sign({ mid:result.id }, secret );
            res.send({
                success: true,
                id:result.id,
                member_id: member_id,
                token: token
            });
        } else {
            res.send({ success: false, message: '사용자가 없거나 틀린 비밀번호입니다.'});
        };
    } else {
        res.send({ success: false, message: '사용자가 없거나 틀린 비밀번호입니다.'})
    }

});

module.exports = router;