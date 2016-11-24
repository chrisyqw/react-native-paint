# React Native Paint

Minimal implementation of a "Paint" app using React Native and Exponent

https://exp.host/@test123/rmotr-paint

<p align="center">
  <img src="http://i.imgur.com/XzR65hx.gif">
</p>


## Setting up project dependencies

```bash
$ npm install -d
```

## Setting up the Exponent Development CLI

```bash
$ npm install -g exp
```

## Login or Signup

In order to start Exponent server, you would need to be registered.

```
$ exp login
```

```
$ exp signup
```

## Running the app in a local server

Exponent Development CLI provides, out of the box, a way to start a local server for your app and give your a URL to it. Just execute the `exp start` command from Exponent Development CLI and the application will start. To see all options available execute `exp start --help`.

The server will continue running until you stop it with `exp stop`. Use `exp logs` to view logs.

Also you can specify type of protocol to use with `--exp`, `--http` (default) or `--redirect` options. You can choose type of host to use with too with `--lan`, `--localhost` or `--tunnel` (default) options. That last one allow you to view your app on other network.

```bash
$ exp start --dev [options]
```

## Running the app in your simulator

Exponent Development CLI also provides a way to opens your app in Exponent app in a currently running iOS simulator on your computer, or on a connected Android device.

```bash
$ exp start --ios [options]
```

```bash
$ exp start --android [options]
```

Note: If you will use an Android emulator, you will probably need to configure the `ANDROID_HOME` and `PATH` env variables to make it works correctly.

---
<p align="center">
  <img src="http://i.imgur.com/0WbWPlA.png?1">
</p>
