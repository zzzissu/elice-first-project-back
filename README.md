## URL
http://http://kdt-react-node-1-team04.elicecoding.com/3003/

## USER API
**유저 정보 추출** | 메소드: `GET` URL: `/api/users` <br>
**회원 가입** | 메소드: `POST` URL: `/api/users/signup` <br>
**로그인** | 메소드: `POST` URL: `/api/users/signin` <br>
**비밀번호 재설정  이메일 발송** | 메소드: `POST` URL: `/api/users/password/request` <br>
**비밀번호 재설정 코드 요청** | 메소드: `POST` URL: `/api/users/code/request` <br>
**비밀번호 재설정** | 메소드: `POST` URL: `/api/users/password/reset` <br>
**회원 탈퇴** | 메소드: `DELETE` URL: `/api/users/delete` <br>

## ALERT API
**이메일 알림** | `메소드: GET` `URL: /api/email/check`

## EMAIL API
**받은 이메일 조회** | 메소드: `GET` URL: `/api/email/received` <br>
**보낸 이메일 조회** | 메소드: `GET` URL: `/api/email/sent` <br>
**이메일 확인** | 메소드: `PATCH` URL: `/api/email/check/${email_id}` <br>
**이메일 작성** | 메소드: `POST` URL: `/api/email/post` <br>
**이메일 삭제** | 메소드: `DELETE` URL: `/api/email/${email_id}` <br>

## APPROVAL API
**연차 신청서 작성** | 메소드: `POST` URL: `/api/approval/annual` <br>
**외근 신청서 작성** | 메소드: `POST` URL: `/api/approval/outside` <br>
**업무 보고서 작성** | 메소드: `POST` URL: `/api/approval/businessreport` <br>
**결재 현황 조회** | 메소드: `GET` URL: `/api/approval/count` <br>
**결재 대기중 조회** | 메소드: `GET` URL: `/api/approval/wait` <br>
**결재 완료 조회** | 메소드: `GET` URL: `/api/approval/confirm` <br>

## ANNOUNCEMENT API
**공지사항 조회** | 메소드: `GET` URL: `/api/announcement` <br>
**공지사항 작성** | 메소드: `POST` URL: `/api/announcement/post` <br>
**공지사항 삭제** | 메소드: `DELETE` URL: `/api/announcement${schedule_id}` <br>

## PROFILE API
**프로필 조회** | 메소드: `GET` URL: `/api/profile` <br>
**전화번호 업데이트** | 메소드: `PUT` URL: `/api/profile/phone` <br>
**프로필 사진 업데이트** | 메소드: `PUT` URL: `/api/profile/image` <br>

## STATE API
**상태창 업데이트** | 메소드: `PUT` URL: `/api/state` <br>
**상태메시지 저장** | 메소드: `POST` URL: `/api/state/message` <br>
**상태메시지 조회** | 메소드: `GET` URL: `/api/state/profile` <br>
**상태 조회** | 메소드: `GET` URL: `/api/state/all` <br>

## SCHEDULE API
**일정 추가** | 메소드: `POST` URL: `/api/schedule` <br>
**개인 일정 조회** | 메소드: `GET` URL: `/api/schedule/user` <br>
**팀 일정 조회** | 메소드: `GET` URL: `/api/schedule/team` <br>
**개인 일정 -> 팀 일정** | 메소드: `PATCH` URL: `/api/schedule/topublic/${scheduleId}` <br>
**개인 일정 삭제** | 메소드: `DELETE` URL: `/api/schedule/user/${scheduleId}` <br>
**팀 일정 삭제** | 메소드: `DELETE` URL: `/api/schedule/team/${scheduleId}` <br>
