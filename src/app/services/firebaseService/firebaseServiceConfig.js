const prodConfig = {
	apiKey: "AIzaSyBkbT_mvFL9BQD7iUfX31WFGD7AymXNNLM",
	authDomain: "ohif-b48ec.firebaseapp.com",
	projectId: "ohif-b48ec",
	storageBucket: "ohif-b48ec.appspot.com",
	messagingSenderId: "195471566168",
	appId: "1:195471566168:web:7f6af1dac84e9a37bb712d",
	measurementId: "G-FCX9D3KW10"
};

const devConfig = {
	apiKey: "AIzaSyBkbT_mvFL9BQD7iUfX31WFGD7AymXNNLM",
	authDomain: "ohif-b48ec.firebaseapp.com",
	projectId: "ohif-b48ec",
	storageBucket: "ohif-b48ec.appspot.com",
	messagingSenderId: "195471566168",
	appId: "1:195471566168:web:7f6af1dac84e9a37bb712d",
	measurementId: "G-FCX9D3KW10"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
