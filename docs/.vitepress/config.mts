import { defineConfig } from 'vitepress'
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";

import { SearchPlugin } from "vitepress-plugin-search";
import flexSearchIndexOptions from "flexsearch";

let sideBarOptions:any = { prefix: '.', collapsed: false };

//default options
var searchOptions = {
  ...flexSearchIndexOptions,
  previewLength: 100, //搜索结果预览长度
  buttonLabel: "搜索",
  placeholder: "情输入关键词",
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JavaLearning",
  description: "Java",
  vite: {
    plugins: [
            AutoSidebar(sideBarOptions),
            SearchPlugin(searchOptions)
        ],
  },
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
        {
        text: "面试指南",
        items: [
      {
        text: "Java",
        items: [
          {text: "基础", link: "/java/java-basic.md", },
          {text: "集合", link: "/java/java-collection.md", },
          {text: "并发", link: "/java/java-concurrent.md", },
          {text: "JVM", link: "/java/jvm.md", },
          {text: "Java8", link: "/java/java8", },
          {text: "Tomcat", link: "/web/tomcat.md", },
        ]
      },
            {
                text: "框架",
                items: [
                    {text: "Spring面试题", link: "/framework/spring.md", },
                    {text: "SpringMVC面试题", link: "/framework/springmvc.md", },
                    {text: "Mybatis面试题", link: "/framework/mybatis.md", },
                    {text: "SpringBoot面试题", link: "/framework/springboot.md", },
                    {text: "SpringCloud详解", link: "/framework/springcloud/", },
                    {text: "SpringCloud面试题", link: "/framework/springcloud-interview.md", },
                    {text: "ZooKeeper面试题", link: "/zookeeper/zk.md", },
                    {text: "Netty详解", link: "/framework/netty/", },
                ]
            },
            {
                text: "消息队列",
                items: [
                    {text: "消息队列面试题", link: "/message-queue/mq.md", },
                    {text: "RabbitMQ面试题", link: "/message-queue/rabbitmq.md", },
                    {text: "Kafka面试题", link: "/message-queue/kafka.md", },
                ]
            },
            {
                text: "关系型数据库",
                items: [
                    {text: "MySQL基础", link: "/database/mysql-basic/01-data-type.md", },
                    {text: "MySQL面试题", link: "/database/mysql.md", },
                    {text: "MySQL执行计划详解", link: "/database/mysql-execution-plan.md", },
                ]
            },
            {
                text: "非关系型数据库",
                items: [
                    {text: "Redis基础", link: "/redis/redis-basic/", },
                    {text: "Redis面试题", link: "/redis/redis.md", },
                    {text: "MongoDB面试题", link: "/database/mongodb.md", },
                ]
            },
      {
        text: "计算机基础",
        items: [
          {text: "网络", link: "/computer-basic/network.md", },
                    {text: "TCP专题", link: "/computer-basic/tcp.md", },
          {text: "操作系统", link: "/computer-basic/operate-system.md", },
          {text: "算法", link: "/computer-basic/algorithm.md", },
          {text: "LeetCode题解", link: "/leetcode/hot120", },
          {text: "数据结构", link: "/computer-basic/data-structure.md", },
        ]
      },
    ]
  },
    {
        text: "进阶之路",
        items: [
            {
                text: "海量数据",
                items: [
                    {text: "统计不同号码的个数", link: "/mass-data/01-count-phone-num.md", },
                    {text: "出现频率最高的100个词", link: "/mass-data/02-find-hign-frequency-word.md", },
                    {text: "查找两个大文件共同的URL", link: "/mass-data/03-find-same-url.md", },
                    {text: "如何在100亿数据中找到中位数？", link: "/mass-data/04-find-mid-num.md", },
                    {text: "如何查询最热门的查询串？", link: "/mass-data/05-find-hot-string.md", },
                    {text: "如何找出排名前 500 的数？", link: "/mass-data/06-top-500-num.md", },
                    {text: "如何按照 query 的频度排序？", link: "/mass-data/07-query-frequency-sort.md", },
                    {text: "大数据中 TopK 问题的常用套路", link: "/mass-data/08-topk-template.md", },
                ]
            },
            {
                text: "系统设计",
                items: [
                    {text: "扫码登录设计", link: "/advance/system-design/01-scan-code-login.md", },
                    {text: "超时订单自动取消", link: "/advance/system-design/02-order-timeout-auto-cancel.md", },
                    {text: "短链系统设计", link: "/advance/system-design/README.md", },
                    {text: "微信红包系统如何设计？", link: "/advance/system-design/README.md", },
                    {text: "单点登录设计与实现", link: "/advance/system-design/README.md", },
                    {text: "如何用 Redis 统计用户访问量？", link: "/advance/system-design/README.md", },
                    {text: "实时订阅推送设计与实现", link: "/advance/system-design/README.md", },
                    {text: "如何设计一个抢红包系统", link: "/advance/system-design/README.md", },
                    {text: "购物车系统怎么设计？", link: "/advance/system-design/README.md", },
                    {text: "如何设计一个注册中心？", link: "/advance/system-design/README.md", },
                    {text: "如何设计一个高并发系统？", link: "/advance/system-design/README.md", },
                    {text: "10w级别数据Excel导入怎么优化？", link: "/advance/system-design/README.md", },
                ]
            },
        {
        text: "分布式",
        items: [
          {text: "全局唯一ID", link: "/advance/distributed/01-global-unique-id.md", },
          {text: "分布式锁", link: "/advance/distributed/02-distributed-lock.md", },
          {text: "RPC", link: "/advance/distributed/03-rpc.md", },
          {text: "微服务", link: "/advance/distributed/04-micro-service.md", },
          {text: "分布式架构", link: "/advance/distributed/05-distibuted-arch.md", },
          {text: "分布式事务", link: "/advance/distributed/06-distributed-transaction.md", },
        ]
      },
        {
        text: "高并发",
        items: [
          {text: "限流", link: "/advance/concurrent/01-current-limiting.md", },
          {text: "负载均衡", link: "/advance/concurrent/02-load-balance.md", },
        ],
      },
            {
        text: "设计模式",
        items: [
          {text: "设计模式详解", link: "/advance/design-pattern/", },
        ],
      },
      {
                text: "优质文章",
                items: [
                    {text: "优质文章汇总", link: "/advance/excellent-article", },
                ]
            },
        ]
    },
    {
        text: "工具",
        items: [
            {
                text: "开发工具",
                items: [
                    {text: "Git详解", link: "/tools/git/", },
                    {text: "Maven详解", link: "/tools/maven/", },
                    {text: "Docker详解", link: "/tools/docker/", },
                    {text: "Linux常用命令", link: "/tools/linux", },
                ]
            },
            {
                text: "在线工具",
                items: [
                ]
            },
            {
                text: "编程利器",
                items: [
                    {text: "markdown编辑器", link: "/tools/typora-overview.md", },
                ]
            },
        ]
    },
    {
        text: "珍藏资源",
        items: [
            {
                text: "学习资源",
                items: [
                    {text: "Leetcode刷题笔记", link: "/learning-resources/leetcode-note.md", },
                ]
            },
            {
                text: "学习路线",
                items: [
                    {text: "Java学习路线", link: "/learning-resources/java-learn-guide.md", },
                    {text: "CS学习路线", link: "/learning-resources/cs-learn-guide.md", },
                ]
            },

        ]
    }

    ],

    socialLinks: [
    ]
  }
})
