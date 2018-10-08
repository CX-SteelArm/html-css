Flex and Grid

### Flex

Basic styles:

> Container:
>> display: flex;
>> flex-direction: column/row/column-reverse/row-reverse; 
>> justify-content: flex-end/flex-start/center/space-around/space-between/space-evenly
>> align-items: flex-end...

> Item:
>> align-self: flex-end... 单个元素的垂直对齐方式

Normal Styles:

> Container:
>> flex-wrap: wrap/wrap-reverse 允许多行排布
>> align-content: space-evenly 这个属性指的是有多列的flex子元素，怎么排列

> Item:
>> flex-grow: [Integer] 这个属性指明拉伸(理解为)时元素拉伸多少倍，默认是1，设置为0时不会被拉伸，注意指的是拉伸比例而不是占据flex容器的多少
>> flex-shrink: 与flex-grow 相反
>> flex-basis: [Num]px 代替元素初始大小
>> flex: flex-grow flex-shrink flex-basis; 简写形式
