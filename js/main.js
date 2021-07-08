// home 타이핑
var typingBool = false;
var typingIdx = 0;
var liIndex = 0;
var liLength = $(".typing-txt>ul>li").length;

// 타이핑될 텍스트를 가져온다
var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
typingTxt = typingTxt.split(""); // 한글자씩 자른다.
if (typingBool == false) { // 타이핑이 진행되지 않았다면
    typingBool = true;
    var tyInt = setInterval(typing, 100); // 반복동작
}

function typing() {
    if (typingIdx < typingTxt.length) { // 타이핑될 텍스트 길이만큼 반복
        $(".typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
        typingIdx++;
    } else { //한문장이끝나면
        //다음문장으로.. 마지막문장이면 다시 첫번째 문장으로
        if (liIndex >= liLength - 1) {
            liIndex = 0;
        } else {
            liIndex++;
        }

        //다음문장을 타이핑하기위한 셋팅
        typingIdx = 0;
        typingBool = false;
        typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

        //다음문장 타이핑전 1초 쉰다
        clearInterval(tyInt);
        setTimeout(function () {
            $(".typing").html('');
            tyInt = setInterval(typing, 200);
        }, 1500);
    }
}
$('#textPosition').css({
    position: 'absolute',
    top: '0',
    left: '0'
});
$('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $anchor.parent().addClass('on').siblings().removeClass('on');
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();//<- a태그의 본기능(링크기능)을 막아줌 이외에도 버튼, 인풋 등 
});

$(window).scroll(function(){
    //스크롤이 될때마다 위치를 담아라
    var scrollTopPos = $(window).scrollTop();
    if(scrollTopPos > 0){//스크롤을 밑으로 내리는 순간 처리
        $("body").addClass('scroll');
    }
    else{//스크롤이 완전 위에 닿았을때 처리
        $("body").removeClass('scroll');
    }
});

var dtnum = 0;

$("#interview dt").click(function(){
    clearInterval(autoDt);
    dtnum = $(this).data('num');
    interview(dtnum);
});

var autoDt = setInterval(function(){
                        dtnum++;
                        dtnum = dtnum % 5;
                        interview(dtnum);
                    },1000);

function interview(num){    //선언
    $("#interview dt").eq(num).toggleClass('on').siblings().removeClass('on');
}

//$("#interview dt").eq(dtnum).click();

