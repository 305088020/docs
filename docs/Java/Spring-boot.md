---
title: Spring-boot配置
description: 页面的描述
---
### Spring-boot配置

### 1、读取配置文件内容

* @Value
* Environment
* @ConfigurationProperties

```java
@RestController
public class HelloController {

    @Value("${name}")
    private String name;

    @Autowired
    private Environment env;

    @Autowired
    private Person person;

    @RequestMapping("/hello")
    public String Hello(){
        System.out.println(name);
        System.out.println("-----分割线-----");
        System.out.println(env.getProperty("name"));
        System.out.println("-----分割线-----");
        for (String add : person.getAddress()) {
            System.out.println(add);
        }
        return "Hello World";
    }
}
```

```java
@Component
@ConfigurationProperties(prefix = "person")
public class Person {
    private String name;
    private int age;
    private String[] address;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String[] getAddress() {
        return address;
    }

    public void setAddress(String[] address) {
        this.address = address;
    }
}
```



#### 2、profile配置

> 1. profile是用来完成不同环境下，配置动态切换功能的。
> 2. profile配置方式：
>     1. 多profile文件方式：提供多个配置文件，每个代表一种环境。
>         * application-dev.properties/yml 开发环境
>         * application-test.properties/yml 测试环境
>         * application-pro.properties/yml 生产环境
>     2. yml多文档方式：
>         * 在yml中使用 --- 分割不同配置
> 3. profile激活方式
>     * 配置文件：在配置文件中配置：spring.profiles.active=dev
>     * 虚拟机参数：在VM options指定：-Dspring.profiles.active=dev
>     * 命令行参数：java -jar xxx.jar --spring.profiles.active=dev



#### 3、内部配置文件加载顺序

> Springboot程序启动时，会从以下位置加载配置文件：
>
> ​	1、file:../config/:当前项目下的/config目录下
>
> ​	2、file:./ :当前项目的根目录
>
> ​	3、classpath:/config/: classpath的config目录
>
> ​	4、classpath:/ :classpath的根目录
>
> 加载顺序为上文的排列顺序，高优先级配置的树形会生效，覆盖低优先级的配置



### SpringBoot自动配置

> @EnableAutoConfiguration 注解
>
> * @EnableAutoConfiguration 注解内部使用@Import(AutoConfigurationImportSelector.class)来加载配置类。
> * 配置文件位置：META-INF/spring.factories，该配置文件中定义了大量的配置类，当SpringBoot应用启动时，会自动加载这些配置类，初始化Bean
> * 并不是所有的Bean都会被初始化，在配置类中使用Condition来加载满足条件的Bean



