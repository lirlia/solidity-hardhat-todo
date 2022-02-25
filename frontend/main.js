import todoContract from '../artifacts/contracts/todo.sol/todo.json' assert { type: "json" };

//Ganacheのデフォルトのポート番号は7545
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// check metamask
// https://docs.metamask.io/guide/getting-started.html#basic-considerations
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}

// 自分のアカウント情報を取得
const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
const account = accounts[0];
web3.eth.defaultAccount = account;
console.log(web3.eth.defaultAccount);

const contract = new web3.eth.Contract(todoContract.abi, contractAddress)

// 初期表示
displayTodo()

// 作成ボタン押下時の処理
$("#createTodoButton").click(function () {
  createTodo($("#createTodoInput").val());
});

// 削除ボタン押下時の処理
// DOM 生成後に作られたオブジェクトなので on を使う
$(document).on("click", ".deleteTodoButton", function () {
  const id=$(this).parent().attr('id');
  deleteTodo(id);
});

// チェックボックス押下時の処理
// DOM 生成後に作られたオブジェクトなので on を使う
$(document).on("change", "input[type=checkbox]", function(){
  const id=$(this).parent().attr('id');
  const is_opened=$(this).prop("checked") ? false : true
  updateTodo(id, is_opened);
});

// TODOの作成
function createTodo(msg) {
  createABI(msg).
  then(() => displayTodo().
    then($('#createTodoInput').val(""))
  );
}

// TODOの更新
function updateTodo(id, is_opened) {
  updateABI(id, is_opened);
}

// TODOの削除
function deleteTodo(id) {
  deleteABI(id).
  then(() => displayTodo());
}

// TODOの詳細の取得
async function describeTodo(id) {
  const todo = await describeABI(id)
  todo['id'] = id
  return todo
}

// TODOリストの表示
async function displayTodo() {

  const todoList=[]
  //
  // getABI で取得した TODO の一覧を使って
  // describeTodo で詳細情報を非同期で取得します
  // 取得した結果は todoList に格納します
  //
  // このとき describeTodo の呼び出し、todoList の格納が
  // それぞれ非同期で行われるため Promise.all を使って
  // どちらの挙動もきちんと終了してから画面の描画(_updateDisplay)を
  // 呼び出さないと値が正しく格納されないため 2 回利用しています。
  //
  getABI()
    .then((ids) =>  {
      Promise.all(
        ids.map(async function(id) {
          todoList.push(describeTodo(id))
        })
      ).then(
        Promise.all(todoList)
        .then(values => {
          _updateDisplay(values)
        })
      )
    }
  )
}

// TODOリストの表示更新
function _updateDisplay(todoList) {

  // 表示する HTML を生成
  let todoHTMLItems = ""
  for (const e of todoList) {
    const checkFlag = e.is_opened ? "" : "checked"

    todoHTMLItems = todoHTMLItems + '<li id="'+ e.id +'" class="list-group-item border-0 d-flex align-items-center ps-0"><input class="deleteTodoButton btn btn-danger" type="button" value="削除"/>　　<input class="form-check-input me-3" type="checkbox" value="" aria-label="..." ' + checkFlag + ' />' + e.contents + '</li>'
  }

  // 画面の更新
  $('.list-group').replaceWith("<ul class='list-group rounded-0'>"+ todoHTMLItems +"</ul>")
}

// contract から TODO リストを取得
async function getABI() {
  return await contract.methods.getTODO().call({from: web3.eth.defaultAccount})
}

// contract から特定の TODO を取得
async function describeABI(id) {
  return await contract.methods.todos(id).call({from: web3.eth.defaultAccount});
}

// contract から TODO を作成
async function createABI(contents) {
  await contract.methods.createTODO(contents).send({from: web3.eth.defaultAccount})
}

// contract で TODO を更新
async function updateABI(id, is_opened) {
  await contract.methods.updateTODO(id, is_opened).send({from: web3.eth.defaultAccount})
}

// contract で TODO を削除
async function deleteABI(id) {
  await contract.methods.deleteTODO(id).send({from: web3.eth.defaultAccount})
}
