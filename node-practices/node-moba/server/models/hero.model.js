const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    // 可以关联多个分类
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Categories' }],
    // 定义复合类型
    // 难度/技能/攻击/生存
    scores: {
        difficult: { type: Number },
        skill: { type: Number },
        attack: { type: Number },
        survival: { type: Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    // 顺风出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Items' }],
    // 逆风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Items' }],
    // 使用技巧
    usageTips: { type: String },
    // 对抗技巧
    battleTips: { type: String },
    // 团战思路
    teamTips: { type: String },
    // 英雄关系
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Heroes' },
        description: { type: String }
    }]
})

module.exports = mongoose.model('Heroes', schema)