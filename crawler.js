//模块 
    //=> http ,cheerio(jq),promise
    //video => id卡，baseURL => 页面爬取 ，getURL => AJAX
const http = require('http');
const cheerio = require('cheerio');
const promise = require('promise');
let videoIds =['883967'];
var fs = require('fs');
var outputFilename = './tmp/my.json';
const baseurl = 'http://www.gamersky.com/handbook/201703/';
//const getUrl = 'http://www.imooc.com/course/AjaxCourseMembers?ids=';

//map存值
let stydyNumber = new Map();

for(let i=1;i<25;i++){
    videoIds.push(videoIds[0]+'_'+i)
};

console.log(videoIds)



//模板，过滤，存值
function filterCharters(html) {
    const $ = cheerio.load(html);
    let idname = $('.tc strong').text().trim();  
    let charter = $('.table2');
    let number;
    let courseData = {
        kind:0,
        name:idname,
        weakness:[],
        meatQuality:[],
        reward:{
            hunting:[],
            capture:[]
        },
        home:{},
        mission:[],

    };
    function $lee(i,y,z){
        return $($($($(charter[i]).find('tr'))[y]).find('td')[z]).text().trim()
    }

    courseData.kind = $lee(0,1,1);
    courseData.meatQuality = 
        {
            head:{
                chop:$lee(2,1,1),
                hit:$lee(2,1,2),
                ball:$lee(2,1,3),
                fire:$lee(2,1,4),
                water:$lee(2,1,5),
                thunder:$lee(2,1,6),
                ice:$lee(2,1,7),
                dragon:$lee(2,1,8),
                bol:$lee(2,1,9)
            },
            first:{
                chop:$lee(2,2,1),
                hit:$lee(2,2,2),
                ball:$lee(2,2,3),
                fire:$lee(2,2,4),
                water:$lee(2,2,5),
                thunder:$lee(2,2,6),
                ice:$lee(2,2,7),
                dragon:$lee(2,2,8),
                bol:$lee(2,2,9)
            },
            trunk:{
                chop:$lee(2,3,1),
                hit:$lee(2,3,2),
                ball:$lee(2,3,3),
                fire:$lee(2,3,4),
                water:$lee(2,3,5),
                thunder:$lee(2,3,6),
                ice:$lee(2,3,7),
                dragon:$lee(2,3,8),
                bol:$lee(2,3,9)
            },
            wind:{
                chop:$lee(2,4,1),
                hit:$lee(2,4,2),
                ball:$lee(2,4,3),
                fire:$lee(2,4,4),
                water:$lee(2,4,5),
                thunder:$lee(2,4,6),
                ice:$lee(2,4,7),
                dragon:$lee(2,4,8),
                bol:$lee(2,4,9)
            },
            wf:{
                chop:$lee(2,5,1),
                hit:$lee(2,5,2),
                ball:$lee(2,5,3),
                fire:$lee(2,5,4),
                water:$lee(2,5,5),
                thunder:$lee(2,5,6),
                ice:$lee(2,5,7),
                dragon:$lee(2,5,8),
                bol:$lee(2,5,9)
            },
            tf:{
                chop:$lee(2,6,1),
                hit:$lee(2,6,2),
                ball:$lee(2,6,3),
                fire:$lee(2,6,4),
                water:$lee(2,6,5),
                thunder:$lee(2,6,6),
                ice:$lee(2,6,7),
                dragon:$lee(2,6,8),
                bol:$lee(2,6,9)
            },
            bf:{
                chop:$lee(2,7,1),
                hit:$lee(2,7,2),
                ball:$lee(2,7,3),
                fire:$lee(2,7,4),
                water:$lee(2,7,5),
                thunder:$lee(2,7,6),
                ice:$lee(2,7,7),
                dragon:$lee(2,7,8),
                bol:$lee(2,7,9)
            },
            tail:{
                chop:$lee(2,8,1),
                hit:$lee(2,8,2),
                ball:$lee(2,8,3),
                fire:$lee(2,8,4),
                water:$lee(2,8,5),
                thunder:$lee(2,8,6),
                ice:$lee(2,8,7),
                dragon:$lee(2,8,8),
                bol:$lee(2,8,9)
            }

        }
        
    ;
    courseData.weakness = {
        chop:$lee(1,1,1),
        hit:$lee(1,1,2),
        ball:$lee(1,1,3),
        fire:$lee(1,1,4),
        water:$lee(1,1,5),
        thunder:$lee(1,1,6),
        ice:$lee(1,1,7),
        dragon:$lee(1,1,8)
    };
    courseData.reward.hunting = {
        body:{
            time:parseInt($lee(3,1,0).split('（')[1]),
            inferior:$lee(3,1,1).split('\n').map((v)=>v.trim()),
            top:$lee(3,1,2).split('\n').map((v)=>v.trim()),
            g:$lee(3,1,3).split('\n').map((v)=>v.trim())
        },
        tail:{
            time:parseInt($lee(3,2,0).split('（')[1]),
            inferior:$lee(3,2,1).split('\n').map((v)=>v.trim()),
            top:$lee(3,2,2).split('\n').map((v)=>v.trim()),
            g:$lee(3,2,3).split('\n').map((v)=>v.trim())
        },
        littertail:{
            time:parseInt($lee(3,3,0).split('（')[1]),
            inferior:$lee(3,3,1).split('\n').map((v)=>v.trim()),
            top:$lee(3,3,2).split('\n').map((v)=>v.trim()),
            g:$lee(3,3,3).split('\n').map((v)=>v.trim())
        }
    }
    courseData.reward.capture = {
        head:{
            inferior:$lee(4,1,1).split('\n').map((v)=>v.trim()),
            top:$lee(4,1,2).split('\n').map((v)=>v.trim()),
            g:$lee(4,1,3).split('\n').map((v)=>v.trim())
        },
        back:{
            inferior:$lee(4,2,1).split('\n').map((v)=>v.trim()),
            top:$lee(4,2,2).split('\n').map((v)=>v.trim()),
            g:$lee(4,2,3).split('\n').map((v)=>v.trim())
        },
        wing:{
            inferior:$lee(4,3,1).split('\n').map((v)=>v.trim()),
            top:$lee(4,3,2).split('\n').map((v)=>v.trim()),
            g:$lee(4,3,3).split('\n').map((v)=>v.trim())
        },
        tf:{
            inferior:$lee(4,4,1).split('\n').map((v)=>v.trim()),
            top:$lee(4,4,2).split('\n').map((v)=>v.trim()),
            g:$lee(4,4,3).split('\n').map((v)=>v.trim())
        }
    }
    courseData.home = [
        {
            name:$lee(5,1,0),
            default:$lee(5,1,1),
            switch:$lee(5,1,2),
            sleep:$lee(5,1,2)
        }
    ];

    for(let i=1;i<$($($(charter[5]).find('tr'))).length;i++){
        courseData.mission.push(
            {difficulty:$lee(5,i,0),
                name:$lee(5,i,1),
                map:$lee(5,i,2),
                target:$lee(5,i,3)
            }        
        )
    }

  

    console.log(courseData)

    return courseData;

}



function  printCousrseinfo(courseData) {
    //尽量先用字符串拼接，结束后再打印值，以免消耗性能
    let print = '';
    courseData.forEach((v) => {
        print += '    学习人数 : ' + v.number +" 课程 : "+v.title + '\n\n';
        print += "### " + v.title+"\n\n";
        v.charter.forEach((v)=>{
            print += "  "+v.chapterTitle+"\n";
            let video = v.videos;
            video.forEach((v)=>{
                print += "    【"+v.id+"】 => "+v.videoTitle.replace(/[\d(\-):+\d]/g,"").replace(/\s+/g,"").split("开始学习")[0]+"\n";
            })
            print+= "\n";
        }) 
    })
    console.log(print)
}

function getPageAsync(url){
    //promise函数
    return new Promise((resolve,reject)=>{
        console.log('正在爬取 => '+ url);
        //之前的回调地狱
        http
        .get(url, (res) => {
            let html = "";
            res.on('data', (data) => {
                html += data;
            })
            res.on('end', () => {
                //结束后，去resolve =》 promise里的then
                resolve(html);
                //let courseData = filterCharters(html);
                //printCousrseinfo(courseData);
            })
        })
        .on('error', (e) => {
            reject(e);  
            console.log('没有数据，爬虫失败');
        })
    })
}

// function getStudyNumber(id){
//     //ajax获取
//     const url = getUrl+id;
//     let members;
//     http.get(url,(res)=>{
//         let data = "";
//         res.on('data',(chunk)=>{
//             data += chunk;
//         })
//         res.on('end',()=>{
//             data = JSON.parse(data).data[0];
//             stydyNumber.set(data.id,data.numbers);
//         })
//     })
// }


let fetchCourseArray = [];
videoIds.forEach((id)=>{
    fetchCourseArray.push(getPageAsync(baseurl+id+'.shtml'));
    //getStudyNumber(id);
})
Promise
        .all(fetchCourseArray)
        .then((pages)=>{
            //all里数组全部执行完毕后，执行
            let coursesData = [];
            pages.forEach((html)=>{
                //过滤
                let courses = filterCharters(html);
                coursesData.push(courses);
            });

            fs.writeFile(outputFilename, JSON.stringify(coursesData, null, 4), function(err) {
                if(err) {
                  console.log(err);
                } else {
                  console.log("JSON saved to " + outputFilename);
                }
            });
            
            
        })
