const Sequelize = require('sequelize');

class Todo extends Sequelize.Model{
    static init(sequelize){
        super.init(
            {//테이블의 컬럼 정의
                todo_content: {
                    type:Sequelize.STRING(200),
                    allowNull: false
                }
            },
            {//테이블 설정
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: 'Todo',
                tableName: 'todos',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }

    static associate(db){//테이블간 관계 설정
        db.Todo.belongsTo(db.Member, { foreignKey: {name:'members_no', allowNull:false}, sourceKey: 'id' });
    }
}

module.exports = Todo;