import { Sequelize } from 'sequelize';
// export const sequelize = new Sequelize('plogproject', 'root', '', {
//     host: 'localhost',
//     dialect:"mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });
export const sequelize = new Sequelize('freedb_plog_project_alaa', 'freedb_alaa22', 'Td7a!9bz!7F&xAd', {
    host: 'sql.freedb.tech',port: 3306,
    dialect:"mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });
 export const connectedDB =async()=>{
    try {
       return await sequelize.sync({alter:false});
       
      } catch (error) {
        console.error('xxxxx  Unable to connect to the database xxxxxxxxxxx:', error);
      }
  }
  export default connectedDB;