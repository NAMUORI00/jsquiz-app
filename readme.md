# JS-Quiz-app

##### 프로젝트 소개

- Vite + Vue 를 이용하여 json에 존재하는 4지선다 문제를 출력하고 퀴즈를 내는 웹앱



### 프로젝트 구조



#### 프로젝트 파일 구조

```
├─package.json
├─README.md
├─vite.config.js
├─public
└─src
  ├─App.vue
  ├─Quiz.vue
  ├─main.js
  ├─assets
  └─components
```

- 본앱의 모든 중요코드는 Quiz.vue 를 참조하세요
- 퀴즈문제를 추가하거나 삭제할 경우 public 경로에 존재하는 quiz.json을 참조하세요
- 이 프로젝트는 vite+vue 기본 형식의 프로젝트를 기반으로 작성되었으며, 프로젝트의 큰 뼈대는 이 구조를 참고하면 이해하기 쉬울것입니다



#### Json 파일 구조

```json
// example
[
	{
		"question": "문제",
		"answers": ["답1", "답2", "답3", "답4"],
		"correct": 0
	},
	...
]
```

- question : 문제 지문
- answers : 리스트 형식의 문제에 대한 답변 4지 선다를 기준으로 작성되어 있음
- correct : 리스트의 몇번째 요소가 정답인지를 나타내는 정수값
- 코드에 적힌 문제에 대한 내용은 Chat-gpt 3.5로 자동생성하였으며, 실제 내용과 무관할 수 있음



#### 프로젝트 빌드 방법

```
cd my-quiz-app
npm install
```

- 의존성 라이브러리 설치경우 my-quiz-app/package.json을 참고할것



#### 프로젝트 실행 방법

```
npm run dev
```

- `npm run` 을 사용해도 실행이 되겠지만, 코드와 완전히 똑같은 환경으로 실행을 원하면 상단의 명령어를 이용하는것이 좋습니다.



### 프로젝트 동작 이미지

![project](https://github.com/NAMUORI00/jsquiz-app/blob/main/project.gif)