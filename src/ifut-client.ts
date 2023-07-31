export interface IFutClient {
  login(parameters);
  logout(utas);
  sendCodeToEmail(parameters);
  searchMarket(parameters, utas);
  userMassInfo(utas);
  getTradepile(utas);
  getUnassigned(utas);
  bidAuction(auction, bid, utas);
  clearAuction(auction, utas);
  moveItemToPile(item, pile, utas);
  listItem(item, parameters, utas);
  quickSellItem(item, utas);
  redeemItem(item, utas);
  selectItem(resourceId, utas);
  getPacks(utas);
  previewPack(pack, utas);
  buyPack(pack, utas);
}
