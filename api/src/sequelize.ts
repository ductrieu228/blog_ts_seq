import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('blog_ts_sequlize', 'abu', 'abuabu228', {
    host: 'localhost',
    dialect: 'mysql',
    logging:false
});

// Kiểm tra kết nối
try {
    sequelize.authenticate();
    console.log('Kết nối cơ sở dữ liệu đã thiết lập thành công.');
} catch (error) {
    console.error('Không thể kết nối cơ sở dữ liệu:', error);
}

export default sequelize;
