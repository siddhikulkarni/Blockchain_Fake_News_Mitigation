pragma solidity ^0.4.17;

contract Master
{

    address public master_account;
    uint public registeration_fee;
    uint public publishing_fee;
    uint public threshold;
    uint public terminate;
    uint public publisher_count;

    mapping(bytes32=>bytes32) public login;
    mapping(bytes32=>uint)public typeofuser;
    mapping(bytes32=>address)public username_address;
    mapping(address=>bool) public blacklist;

    address[] public blacklist_names;
    address[] public deployedPublishers;

    struct Details{

        string publishername;
        string publisherdescription;
        string publisherphoto;
        address contractaddress;
    }

    Details[] public publisherdetails;

    struct Category{

        uint articleid;
        address articlewriteraddress;
        string articlewritername;
        string articleheadline;
        string articlephoto;
    }

    Category[] public politics;
    Category[] public sports;
    Category[] public finance;
    Category[] public entertainment;
    Category[] public other;

    uint public politics_count;
    uint public sports_count;
    uint public finance_count;
    uint public entertainment_count;
    uint public other_count;

    function Master(uint registeration_fee_local,uint
    publishing_fee_local,uint threshold_local,uint terminate_local) public
    {
        master_account=msg.sender;
        registeration_fee=registeration_fee_local;
        publishing_fee=publishing_fee_local;
        threshold=threshold_local;
        terminate=terminate_local;
    }
    function signUp(string username_local,string password_local,uint type_local) public
    {
        bytes32 username=keccak256(username_local);
        bytes32 password=keccak256(password_local);

        login[username]=password;
        typeofuser[username]=type_local;
    }
    function Enroll(string name,string description,string photo,string username) public payable
    {
        require(blacklist[msg.sender]==false);
        require(msg.value==registeration_fee);

        address newPublisher = new
Publisher(master_account,msg.sender,deployedPublishers.length,name,description,photo,publishing_fee,threshold,terminate);

        deployedPublishers.push(newPublisher);

        Details memory newDetail=Details({
            publishername:name,
            publisherdescription:description,
            publisherphoto:photo,
            contractaddress:newPublisher
            });

            publisherdetails.push(newDetail);
            publisher_count++;

            username_address[keccak256(username)]=newPublisher;
    }
    function Login(string username_local,string password_local)public view returns(bool,address)
    {
            bytes32 username=keccak256(username_local);
            bytes32 password=keccak256(password_local);
            if(login[username]!=password)
            {
              return(false,0x0000000000000000000000000000000000000000);
            }
            if(typeofuser[username]==0)
            {
              address currentuser=username_address[username];
              return(true,currentuser);
            }

            return(true,0x0000000000000000000000000000000000000000);
    }
    function getDeployedPublishers() public view returns(address[])
    {
        return deployedPublishers;
    }

    function updatePhoto(uint id_local,string publisherphoto_local) public
    {
      publisherdetails[id_local].publisherphoto=publisherphoto_local;
    }
    function updateDetails(uint id_local,string name_local,string description_local) public
    {
      publisherdetails[id_local].publishername=name_local;
      publisherdetails[id_local].publisherdescription=description_local;
    }
    function setRegisterationFee(uint registeration_fee_local) public
    {
        registeration_fee=registeration_fee_local;
    }

    function setPublishingFee(uint publishing_fee_local) public
    {
        publishing_fee=publishing_fee_local;
    }

    function setThreshold(uint threshold_local) public
    {
        threshold=threshold_local;
    }

    function setTerminate(uint terminate_local) public
    {
        terminate=terminate_local;
    }
    function setBlacklist(address blacklist_publisher_address) public
    {
        blacklist[blacklist_publisher_address]=true;
        blacklist_names.push(blacklist_publisher_address);
    }
    function getBlacklisted() public view returns(address[]){
      return blacklist_names;
    }
    function setPolitics(uint articleid_local,address articlewriteraddress_local,string articlewritername_local,string articleheadline_local,string articlephoto_local) public
    {
        Category memory newCategory=Category({

            articleid:articleid_local,
            articlewriteraddress:articlewriteraddress_local,
            articlewritername:articlewritername_local,
            articleheadline:articleheadline_local,
            articlephoto:articlephoto_local
        });

            politics.push(newCategory);
            politics_count++;

    }
    function setSports(uint articleid_local,address articlewriteraddress_local,string articlewritername_local,string articleheadline_local,string articlephoto_local) public
    {
        Category memory newCategory=Category({

            articleid:articleid_local,
            articlewriteraddress:articlewriteraddress_local,
            articlewritername:articlewritername_local,
            articleheadline:articleheadline_local,
            articlephoto:articlephoto_local
        });

            sports.push(newCategory);
            sports_count++;

    }
    function setEntertainment(uint articleid_local,address articlewriteraddress_local,string articlewritername_local,string articleheadline_local,string articlephoto_local) public
    {
        Category memory newCategory=Category({

            articleid:articleid_local,
            articlewriteraddress:articlewriteraddress_local,
            articlewritername:articlewritername_local,
            articleheadline:articleheadline_local,
            articlephoto:articlephoto_local
        });

            entertainment.push(newCategory);
            entertainment_count++;

    }
    function setFinance(uint articleid_local,address articlewriteraddress_local,string articlewritername_local,string articleheadline_local,string articlephoto_local) public
    {
        Category memory newCategory=Category({

            articleid:articleid_local,
            articlewriteraddress:articlewriteraddress_local,
            articlewritername:articlewritername_local,
            articleheadline:articleheadline_local,
            articlephoto:articlephoto_local
        });

            finance.push(newCategory);
            finance_count++;

    }
    function setOther(uint articleid_local,address articlewriteraddress_local,string articlewritername_local,string articleheadline_local,string articlephoto_local) public
    {
        Category memory newCategory=Category({

            articleid:articleid_local,
            articlewriteraddress:articlewriteraddress_local,
            articlewritername:articlewritername_local,
            articleheadline:articleheadline_local,
            articlephoto:articlephoto_local
        });

            other.push(newCategory);
            other_count++;

    }
}
contract Publisher
{

    event after_upvote(uint date,address indexed sender,string details);

    event after_downvote(uint date,address indexed sender,string details);

    address public master_account;


    address public publisher_account;
    uint public id;
    string public name;
    string public description;
    string public publisher_photo="QmVhSGos8tZUxTXtvrFmRovY56JriojyYoUsRrXx2Y6VEg";

    uint public reputation_score=0;
    bool public verified=false;
    uint public warning=0;

    uint public threshold;
    uint public terminate;
    uint public publishing_fee;

    mapping(address=>bool) readers;
    uint public readers_count=0;
    uint public reading_fees=0;
    uint public article_count=0;

    struct ArticleInfo{

        string writer;
        string headline;
        string category;
        string content;
        string article_photo;
        uint time;

    }
    struct ArticleCalc{

        mapping(address=>bool) upvote;
        mapping(address=>bool) downvote;
        uint upvote_count;
        uint downvote_count;
        uint total_count;
        uint article_score;

    }
    ArticleInfo[] public list_of_info;
    ArticleCalc[] public list_of_calc;

    function Publisher(address master_local,address publisher_local,uint id_local,string name_local,string description_local,
    string photo_local,uint publishing_fee_local,uint threshold_local,uint terminate_local) public
    {
        master_account=master_local;
        publisher_account=publisher_local;
        id=id_local;
        name=name_local;
        description=description_local;
        publisher_photo=photo_local;
        publishing_fee=publishing_fee_local;
        threshold=threshold_local;
        terminate=terminate_local;
    }

    modifier masteronly(){
        require(msg.sender==master_account);
        _;
    }

    modifier publisheronly(){
        require(msg.sender==publisher_account);
        _;
    }

    function setPublishingFee(uint publishing_fee_local) public masteronly
    {
        publishing_fee=publishing_fee_local;
    }

    function setThreshold(uint threshold_local) public masteronly
    {
        threshold=threshold_local;
    }

    function setTerminate(uint terminate_local) public masteronly
    {
        terminate=terminate_local;
    }

    function setReadingFees(uint reading_fees_local) public publisheronly
    {
        reading_fees=reading_fees_local;
    }

    function setPublisherPhoto(string publisher_photo_local) public publisheronly
    {
        publisher_photo=publisher_photo_local;
    }

    function setReader() public payable
    {
        require(msg.value==(reading_fees));

        readers[msg.sender]=true;

        readers_count++;
    }

    function Update(string name_local,string description_local) public publisheronly
    {
        name=name_local;
        description=description_local;
    }

    function publish(string headline_local,string category_local,string content_local,string article_photo_local) public payable publisheronly
    {
        require(msg.value==publishing_fee);

        article_count++;
        ArticleInfo memory newArticle=ArticleInfo({

            writer:name,
            headline:headline_local,
            category:category_local,
            content:content_local,
            article_photo:article_photo_local,
            time:now
        });

        list_of_info.push(newArticle);

        setArticleCalc();

        master_account.transfer(msg.value); //give publishing money to the master

    }
    function setArticleCalc()public
    {
        ArticleCalc memory newArticle=ArticleCalc({

            upvote_count:0,
            downvote_count:0,
            total_count:2,
            article_score:0

        });

        list_of_calc.push(newArticle);
    }

    function getArticleCount()public view returns(uint)
    {
      return list_of_info.length;
    }

    function getPublisherDetails() public view
returns(address,string,string,uint,uint,uint,bool,uint,string)
    {
        return(
            publisher_account,
            name,
            description,
            reputation_score,
            readers_count,
            article_count,
            verified,
            warning,
            publisher_photo
            );
    }

    function upvote(uint index) public returns(bool)
    {
        require(readers[msg.sender]==true);  //check is user is a registered reader for that publisher

        ArticleCalc storage article=list_of_calc[index];

        require(!article.upvote[msg.sender]); //user should not have already upvoted

        if(article.downvote[msg.sender]==true) //if he has downvoted first then nullify that
        {
            article.downvote[msg.sender]=false;
            article.downvote_count--;
        }

        article.upvote[msg.sender]=true; //now upvote the article
        article.upvote_count++;

        article.article_score=(article.upvote_count*100)/(1+article.upvote_count+article.downvote_count);

        uint total=article.upvote_count+article.downvote_count;

        if(total>=5 && article.article_score<=20)
        {
            remove_article(index);

            warning++;

            calculate_reputation_score();

            return true;
        }

        if(total==article.total_count)
        {
            article.total_count=article.total_count+2;

            calculate_reputation_score();

            after_upvote(now,msg.sender,"This user has upvoted");

            return true;
        }

        after_upvote(now,msg.sender,"This user has upvoted");

        return false;

    }

    function downvote(uint index) public returns(bool)
    {
        require(readers[msg.sender]==true);

        ArticleCalc storage article=list_of_calc[index];

        require(!article.downvote[msg.sender]);

        if(article.upvote[msg.sender]==true)
        {
            article.upvote[msg.sender]=false;
            article.upvote_count--;
        }

        article.downvote[msg.sender]=true;
        article.downvote_count++;

        article.article_score=(article.upvote_count*100)/(1+article.upvote_count+article.downvote_count);

        uint total=article.upvote_count+article.downvote_count;

        if(total>=5 && article.article_score<=20)
        {
            remove_article(index);

            warning++;

            calculate_reputation_score();

            return true;
        }

        if(total==article.total_count)
        {
            article.total_count=article.total_count+2;

            calculate_reputation_score();

            after_downvote(now,msg.sender,"This user has downvoted");

            return true;
        }

        after_downvote(now,msg.sender,"This user has downvoted");

        return false;

    }

    function remove_article(uint index) private
    {
        for(uint i=index;i<list_of_info.length-1;i++)
        {
            list_of_info[i]=list_of_info[i+1];
        }

        delete list_of_info[list_of_info.length-1];
        list_of_info.length--;

        for(uint j=index;j<list_of_calc.length-1;j++)
        {
            list_of_calc[j]=list_of_calc[j+1];
        }

        delete list_of_calc[list_of_calc.length-1];
        list_of_calc.length--;
    }

    function calculate_reputation_score() private
    {

        reputation_score=0;

        for(uint i=0;i<list_of_calc.length;i++)
        {
            ArticleCalc memory article=list_of_calc[i];
            reputation_score=reputation_score+article.article_score;
        }
        reputation_score=reputation_score/list_of_calc.length;

        setVerified();
    }

    function setVerified() private
    {
        if(reputation_score>threshold && list_of_calc.length>3)
        {
            verified=true;
        }
        else if(reputation_score<=threshold)
        {
            verified=false;
        }
    }

    function check_reputation_score() public view returns(address)
    {
        if(list_of_calc.length>=3 && reputation_score<=terminate)
        {
            return publisher_account;
        }

        if(warning==2)
        {
            return publisher_account;
        }
        return (0x0000000000000000000000000000000000000000);
    }


    function Revoke() public masteronly
    {
        require(list_of_calc.length>=3);
        require(reputation_score<=terminate);

        selfdestruct(master_account);
    }

}
