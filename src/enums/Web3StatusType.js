export default {
  identity: Symbol('identity'),
  checking: Symbol('checking'),
  waiting: Symbol('waiting'),
  failed: {
    notfound: Symbol('failed.notfound'),
    network: Symbol('failed.network'),
  },
  success: Symbol('success'),
}
