### myBatis原理

> * 获取sqlSessionFactory对象
> * 获取sqlSession对象
> * 获取接口的代理对象（MapperProxy）
> * 执行增删改查方法



> **总结：**
>
> 1. 根据配置文件（全局，sql映射）初始化Configuration对象
> 2. 创建一个DefaultSqlSession对象，里面包含Configuration以及Executor（根据全局配置文件中的defaultExecutorType创建出对应的Executor对象）
> 3. DefaultSqlSession.getMapper():拿到Mapper接口对应的MapperProxy
> 4. MapperProxy里面有DefaultSqlSession
> 5. 执行增删改查方法：
>     1. 调用DefaultSqlSession的增删改查（Executor）
>     2. 会创建一个StatementHandler对象。
>         * 同时也会创建出ParameterHandler和ResultSetHandler
>     3. 调用StatementHandler预编译参数以及设置参数值
>         * 使用ParameterHandler来给sql设置参数
>     4. 调用StatementHandler的增删改查方法
>     5. ResultSetHandler封装结果
>
> **注意：**
>
> ​	四大对象每个创建的时候都有一个interceptorChain.pluginAll(parameterHandler)





<img src="/Users/hezi/Library/Application Support/typora-user-images/image-20210520094928840.png" alt="image-20210520094928840" style="zoom:50%;" />

<img src="/Users/hezi/Library/Application Support/typora-user-images/image-20210520103649789.png" alt="image-20210520103649789" style="zoom:50%;" />

<img src="/Users/hezi/Library/Application Support/typora-user-images/image-20210520113000899.png" alt="image-20210520113000899" style="zoom:50%;" />

<img src="/Users/hezi/Library/Application Support/typora-user-images/image-20210520131632560.png" alt="image-20210520131632560" style="zoom:50%;" />

