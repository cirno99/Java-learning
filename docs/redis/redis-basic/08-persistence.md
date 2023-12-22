---
sidebar: heading
title: Redis持久化
category: 缓存
tag:
  - Redis
head:
  - - meta
    - name: keywords
      content: Redis持久化,RDB,AOF
  - - meta
    - name: description
      content: Redis常见知识点和面试题总结，让天下没有难背的八股文！
---

# 持久化

Redis支持两种方式的持久化，一种是RDB的方式，一种是AOF的方式。前者会根据指定的规则定时将内存中的数据存储在硬盘上，而后者在每次执行完命令后将命令记录下来。一般将两者结合使用。

## RDB方式

RDB 是 Redis 默认的持久化方案。RDB持久化时会将内存中的数据写入到磁盘中，在指定目录下生成一个dump.rdb文件。Redis 重启会加载dump.rdb文件恢复数据。

RDB持久化的过程（执行SAVE命令除外）：

- 创建一个子进程；
- 父进程继续接收并处理客户端的请求，而子进程开始将内存中的数据写进硬盘的临时文件；
- 当子进程写完所有数据后会用该临时文件替换旧的RDB文件。

Redis启动时会读取RDB快照文件，将数据从硬盘载入内存。通过RDB方式的持久化，一旦Redis异常退出，就会丢失最近一次持久化以后更改的数据。

触发RDB快照：

1. 手动触发：
   - 用户执行SAVE或BGSAVE命令。SAVE命令执行快照的过程会阻塞所有来自客户端的请求，应避免在生产环境使用这个命令。BGSAVE命令可以在后台异步进行快照操作，快照的同时服务器还可以继续响应客户端的请求，因此需要手动执行快照时推荐使用BGSAVE命令；

2. 被动触发：
   - 根据配置规则进行自动快照，如`SAVE 300 10`,300秒内至少有10个键被修改则进行快照。
   - 如果从节点执行全量复制操作，主节点自动执行bgsave生成RDB文件并发送给从节点。
   - 默认情况下执行shutdown命令时，如果没有开启AOF持久化功能则自动执行bgsave。
   - 执行debug reload命令重新加载Redis时，也会自动触发save操作。

优点：Redis加载RDB恢复数据远远快于AOF的方式。

缺点：

1. RDB方式数据没办法做到实时持久化/秒级持久化。因为bgsave每次运行都要执行fork操作创建子进程，属于重量级操作，频繁执行成本过高。
2. 存在老版本Redis服务和新版本RDB格式兼容性问题。RDB文件使用特定二进制格式保存，Redis版本演进过程中有多个格式的RDB版本，存在老版本Redis服务无法兼容新版RDB格式的问题。

## AOF方式

AOF（append only file）持久化：以独立日志的方式记录每次写命令，Redis重启时会重新执行AOF文件中的命令达到恢复数据的目的。AOF的主要作用是**解决了数据持久化的实时性**，目前已经是Redis持久化的主流方式。

默认情况下Redis没有开启AOF方式的持久化，可以通过appendonly参数启用`appendonly yes`。开启AOF方式持久化后每执行一条写命令，Redis就会将该命令写进aof_buf缓冲区，AOF缓冲区根据对应的策略向硬盘做同步操作。

默认情况下系统每30秒会执行一次同步操作。为了防止缓冲区数据丢失，可以在Redis写入AOF文件后主动要求系统将缓冲区数据同步到硬盘上。可以通过`appendfsync`参数设置同步的时机。

```
appendfsync always //每次写入aof文件都会执行同步，最安全最慢，只能支持几百TPS写入，不建议配置
appendfsync everysec  //保证了性能也保证了安全，建议配置
appendfsync no //由操作系统决定何时进行同步操作
```

重写机制：

随着命令不断写入AOF，文件会越来越大，为了解决这个问题，Redis引入AOF重写机制压缩文件体积。AOF文件重写是把Redis进程内的数据转化为写命令同步到新AOF文件的过程。

优点：
（1）AOF可以更好的保护数据不丢失，一般AOF会每秒去执行一次fsync操作，如果redis进程挂掉，最多丢失1秒的数据。
（2）AOF以appen-only的模式写入，所以没有任何磁盘寻址的开销，写入性能非常高。
缺点
（1）对于同一份文件AOF文件比RDB数据快照要大。
（2）不适合写多读少场景。
（3）数据恢复比较慢。

RDB和AOF如何选择
（1）仅使用RDB这样会丢失很多数据。
（2）仅使用AOF，因为这一会有两个问题，第一通过AOF恢复速度慢；第二RDB每次简单粗暴生成数据快照，更加安全健壮。
（3）综合AOF和RDB两种持久化方式，用AOF来保证数据不丢失，作为恢复数据的第一选择；用RDB来做不同程度的冷备，在AOF文件都丢失或损坏不可用的时候，可以使用RDB进行快速的数据恢复。


