import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('plogproject', 'root', '', {
    host: 'localhost',
    dialect:"mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });
// export const sequelize = new Sequelize('freedb_plog_project', 'freedb_alaa_Sh', 'c45XC&57#pMxdQu', {
//     host: 'sql.freedb.tech',port: 3306,
//     dialect:"mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });
 export const connectedDB =async()=>{
    try {
       return await sequelize.sync({alter:false});
       
      } catch (error) {
        console.error('xxxxx  Unable to connect to the database xxxxxxxxxxx:', error);
      }
  }
  export default connectedDB;