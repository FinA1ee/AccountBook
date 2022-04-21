const net = require('net');
const chalk = require('chalk');
const check = require('check-node-version');

function checkPortAvailable(port) {
  const server = net.createServer().listen(port);

  return new Promise((resolve, reject) => {
    server.on('listening', function () {
      // 执行这块代码说明端口未被占用
      server.close(); // 关闭服务
      resolve(port);
    });

    server.on('error', function (err) {
      if (err.code === 'EADDRINUSE') {
        // 端口已经被使用
        console.log('端口【' + port + '】被占用, 检测端口【' + (Number(port) + 1) + '】');
      }
      reject();
    });
  });
}

async function getAvailablePort(port = 3000) {
  let PORT = Number(port);

  while (PORT) {
    try {
      await checkPortAvailable(PORT);
      console.log('端口【' + PORT + '】可用');
      return PORT;
    } catch (error) {
      PORT = PORT + 1;
    }
  }
}

function checkNodeVersion() {
  check({ node: '>=14' }, (error, result) => {
    if (!result.isSatisfied) {
      console.log(chalk.red('warnings: 请将 node 升级到 V14.0 以上!!!!!!'));
      console.log('\n');
      return;
    }
  });
}

module.exports = {
  getAvailablePort,
  checkNodeVersion,
};
