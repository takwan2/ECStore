
# AWSリソースの作成

AWSリソースを作成するには、AWS CLIを設定する必要があります。以下の手順を進めるには、AWSコンソール画面からユーザーを作成し、作成したユーザーで、AWS CLIを実行できることが前提となります。

以下コマンドで、本フォルダ（backend）に移動します。

```
$ cd backend
```

以下のコマンドを実行し、必要なライブラリをインストールします。

```
$ pip install -r requirements.txt
```

以下のコマンドを実行し、CloudFormationスタックをデプロイします。

```
$ cdk deploy
```
