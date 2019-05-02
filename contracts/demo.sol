pragma solidity ^0.4.24;

contract demo {
    struct Votingdata {
        uint number;                        //投票编号
        string topic;                       //投票主题
        string startdate;                   //开始时间
        string enddate;                     //结束时间
        string state;                       //投票状态
        string result;                      //投票结果
        string judge;                       //判定条件
        string  choose1;                    //选项1
        string  choose2;                    //选项2
        string  choose3;                    //选项3
        mapping(string => uint) credit;     //通证数
    }
    
    uint ordernumber = 1;
    address owner;
    uint[] record;
    mapping(uint => Votingdata) order;
    mapping(address => uint256) balanceOf;
    
    constructor() public {
        balanceOf[msg.sender] = 100000000;
        owner = msg.sender;
    }

    function addvotingdata(
        uint number,
        string memory topic,
        string memory startdate,
        string memory enddate,
        string memory state,
        string memory result,
        string memory judge,
        string memory choose1,
        string memory choose2,
        string memory choose3
    ) public {
        Votingdata memory votingdata = Votingdata(number,topic,startdate,enddate,state,result,judge,choose1,choose2,choose3);
        order[number] = votingdata;
        record.push(number);
        ordernumber++;
    }

    function backordernumber() external view returns (uint) {
        return ordernumber;
    }

    function backvoting() external view returns (uint[]) {
        return record;
    }

    function vote(uint number,string choose,uint amount) external {
        order[number].credit[choose] += amount;
        balanceOf[owner] += amount;
        balanceOf[msg.sender] -= amount;
    }

    function backcredit(uint number,string choose) external view returns (uint){
        return order[number].credit[choose];
    }

    /**
     * guobin
     * 购买初始通证，作为押金
    */
    function buy(uint amount) external {   
        balanceOf[msg.sender] += amount;
        balanceOf[owner] -= amount;
    }
    
    /**
     * guobin
     * 卖出通证
    */
    function sell(uint amount) external {
        balanceOf[owner] += amount;
        balanceOf[msg.sender] -= amount;
    }

    /**
     * guobin
     * 返回当前用户账户余额
    */
    function check_balance() external view returns (uint) {
        return balanceOf[msg.sender];
    }


    function displayinfo(uint index,uint num) external view returns (string) {
        if(num == 1) {
            return order[index].topic;
        }
        else if(num == 2) {
            return order[index].startdate;
        }
        else if(num == 3) {
            return order[index].enddate;
        }
        else if(num == 4) {
            return order[index].state;
        }
        else if(num == 5) {
            return order[index].result;
        }
        else if(num == 6) {
            return order[index].judge;
        }
        else if(num == 7) {
            return order[index].choose1;
        }
        else if(num == 8) {
            return order[index].choose2;
        }
        else if(num == 9) {
            return order[index].choose3;
        }
    }
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}