import React, { useState } from "react";
import instance from "../../api";

const AddFile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 이미지 파일이 선택된 경우
      const reader = new FileReader();

      reader.onloadend = () => {
        // 파일 읽기 완료 후 미리보기를 위해 상태 업데이트
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    }
  };

  const handleImageUpload = async () => {
    // 이미지를 서버로 업로드하는 로직 추가
    // fetch 또는 axios 등을 사용하여 서버에 이미지를 전송
    // 성공적으로 업로드되면 서버에서 반환된 데이터를 처리
    //   selectedImage

    instance
      .post(
        "/mydiaries",
        {
          diary_title: "file title",
          diary_content: selectedImage,
          cate_data_no: "1",
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDM3MDUzMX0.2NNWyqziEVRSjh3Ob-hYDvDHHHMZvMGJybOA7bg6SZw`,
          },
        }
      )
      .then((res) => {
        alert("등록성공");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "300px" }}
          />
          <button onClick={handleImageUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default AddFile;
