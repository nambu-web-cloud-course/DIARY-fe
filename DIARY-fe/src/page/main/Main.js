function Main() {
    return (
        <div className="ui-main">

        {/* Container */}
        <div className="page-main">
            <div className="box-info">
              <a href="/todolist" className="ui-info">
                <div className="txt-title">Todo List</div>
                <i className="img-todolist"></i>
                <div className="txt-det">
                  오늘 할일을<br />
                  정리해 보세요
                </div>
              </a>

            </div>
            <div className="box-info">
              <a href="/diaryhome" className="ui-info">
                <div className="txt-title">My Diary</div>
                <i className="img-diary"></i>
                <div className="txt-det">
                  원하는 템플릿을 가지고 <br />다이어리를 꾸며보세요
                </div>
              </a>


            </div>
            <div className="box-info">
              <a href="/calendar" className="ui-info">
                <i className="img-calendar"></i>
                <div className="txt-title">Calendar</div>

                <div className="txt-det">
                  한달 동안 Todo List와 <br /> My Diary를 한 눈에
                </div>
              </a>
            </div>
            <div className="box-info">
              <a href="/gallery" className="ui-info">
                <div className="txt-title">Gallery</div>
                <i className="img-gallary"></i>
                <div className="txt-det">

                  다이어리 사진을 한눈에..
                </div>
              </a>
          </div>
        </div>
      </div>
    )
}

export default Main;
