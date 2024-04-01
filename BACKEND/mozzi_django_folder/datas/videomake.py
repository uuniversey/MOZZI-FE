import os
from moviepy.editor import *
import requests
import boto3
from django.conf import settings

def download_images(image_urls, user_id):
    """S3에서 이미지를 다운로드하여 저장하는 함수"""
    saved_image_paths = []
    save_folder_name = f"user_id_{user_id}"  # 폴더 이름을 'user_id_실제ID' 형태로 구성
    save_folder_path = os.path.join(os.getcwd(), save_folder_name)  # 현재 작업 디렉토리에 폴더 경로를 구성

    # 해당 경로가 존재하지 않으면 생성
    if not os.path.exists(save_folder_path):
        os.makedirs(save_folder_path)
    
    for url in image_urls:
        img_name = url.split('/')[-1]  # 이미지 파일 이름 추출
        img_path = os.path.join(save_folder_path, img_name)  # 이미지를 저장할 전체 경로 구성

        # 이미지 URL에서 이미지를 다운로드
        response = requests.get(url)
        if response.status_code == 200:
            with open(img_path, 'wb') as f:
                f.write(response.content)  # 파일에 내용 쓰기
            saved_image_paths.append(img_path)  # 저장된 이미지 경로를 리스트에 추가
    
    print(saved_image_paths)  # 저장된 이미지 경로 출력
    return saved_image_paths


def images_to_video_with_audio(filtered_images, audio_path, output_path, fadeout_duration=3):
    # 비디오 클립들을 저장할 리스트 생성
    video_clips = []
    
    # 각 이미지를 비디오 클립으로 변환하여 리스트에 추가
    for img_path in filtered_images:
        image_clip = ImageClip(img_path).set_duration(5)  # 이미지의 지속 시간은 1초로 설정
        video_clips.append(image_clip)
    
    # 비디오 클립들을 이어붙임
    final_clip = concatenate_videoclips(video_clips, method="compose")
    
    # 오디오 클립 로드
    audio_clip = AudioFileClip(audio_path)
    
    # 전체 비디오의 길이에 맞게 오디오 클립 조정
    # 비디오 길이보다 오디오 길이가 길 경우, 오디오를 자름
    if audio_clip.duration > final_clip.duration:
        audio_clip = audio_clip.subclip(0, final_clip.duration)
    
    # 비디오 길이보다 오디오 길이가 짧은 경우, 오디오를 반복
    else:
        audio_clip = audio_clip.loop(duration=final_clip.duration)
    
    # 비디오 끝에서 오디오 페이드아웃 적용
    audio_clip = audio_clip.set_duration(final_clip.duration).audio_fadeout(fadeout_duration)
    
    # 최종 비디오 클립에 오디오 설정
    final_clip = final_clip.set_audio(audio_clip)
    
    # 동영상 파일로 저장
    final_clip.write_videofile(output_path, codec="libx264", fps=24)

# 이미지 폴더 경로, 오디오 파일 경로, 출력 동영상 파일 경로 설정
# image_folder = "../../images"
# audio_path = "../../audio.mp3"
# output_path = "../../output.mp4"

# 이미지와 오디오를 사용하여 동영상 생성
# images_to_video_with_audio(image_folder, audio_path, output_path)

def list_user_photos(photo_names):
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
    )
    
    urls = []
    for photo_name in photo_names:
        photo_key = f"{photo_name}"  # 여기서 photo_name은 닉네임/사진이름 형태
        photo_url = s3_client.generate_presigned_url('get_object',
                                                     Params={
                                                         'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
                                                         'Key': photo_key
                                                     },
                                                     ExpiresIn=3600)  # URL의 유효 시간(초)
        urls.append(photo_url)
    
    return urls