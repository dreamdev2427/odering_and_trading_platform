/* eslint-disable */
// just a copy-paste from block-pass: https://cdn.blockpass.org/widget/scripts/release/3.0.2/blockpass-kyc-connect.prod.js
// idk how else to get this to work. Blockpass documentation: https://docs.blockpass.org/docs/connect/KYCC-Common-Mgmt-Install-Widget
class BlockpassKYCConnect {
  /**
   * @param {string} e
   * @param {{refId: string, email: string}} t
   */
  constructor(e, t = {
    env: "prod",
    refId: "",
    local_user_id: "",
    elementId: "blockpass-kyc-connect",
    mainColor: "",
    email: "",
    token: ""
  }) {
    switch (this.clientId = e, this.env = t.env || "prod", this.refId = t.refId || "", t.local_user_id && (this.refId = t.local_user_id), this.elementId = t.elementId || "blockpass-kyc-connect", this.env) {
      case "prod":
        this.url = "https://identity.blockpass.org/frontend";
        break;
      case "staging":
        this.url = "https://sandbox-identity.blockpass.org/frontend";
        break;
      case "qa":
        this.url = "https://qa-identity.blockpass.org/frontend";
        break;
      default:
        this.url = "https://identity.blockpass.org/frontend"
    }
    if (this.source = this.url + `/?clientId=${this.clientId}`, "" != this.refId && (this.source = this.source + `&refId=${this.refId}`), void 0 !== t.mainColor && "" !== t.mainColor && (this.source = this.source + `&mainColor=${t.mainColor}`), "undefined" != t.email && void 0 !== t.email && "" !== t.email && (this.source = this.source + `&email=${encodeURIComponent(t.email)}`), void 0 !== t.token && "" !== t.token && (this.source = this.source + `&token=${t.token}`), !this.clientId) throw new Error("missing clientId params");
    if (this.button = document.getElementById(this.elementId), this.html = document.getElementsByTagName("html")[0], this.body = document.getElementsByTagName("body")[0], this.header = document.getElementsByTagName("head")[0], this.link = document.createElement("link"), this.link.setAttribute("rel", "prerender"), this.link.setAttribute("href", this.source), this.header.appendChild(this.link), !this.button) throw new Error('Cannot find the button with id="' + this.elementId + '". Please add it in your html <body>');
    this.callbackKYCConnectSuccess = null, this.callbackKYCConnectCancel = null, this.callbackKYCConnectClose = null, this._initEventHandler()
  }
  startKYCConnect() {
    document.getElementById(this.elementId).removeEventListener("click", this._onBtnClickHandler), document.getElementById(this.elementId).addEventListener("click", this._onBtnClickHandler)
  }
  stopKYCConnect() {
    this.html.style.removeProperty("overflow"), this.body.style.removeProperty("overflow"), this.html.style.removeProperty("margin"), this.body.style.removeProperty("margin"), this.iframe.remove(), this.iframe = null, this.container.remove(), this.container = null, window.removeEventListener("message", this._onIframeMessageHandler)
  }
  on(e, t) {
    "KYCConnectSuccess" === e && (this.callbackKYCConnectSuccess = t), "KYCConnectCancel" === e && (this.callbackKYCConnectCancel = t), "KYCConnectClose" === e && (this.callbackKYCConnectClose = t), "KYCConnectLoad" === e && (this.callbackKYCConnectLoad = t), "KYCConnectData" === e && (this.callbackKYCConnectData = t)
  }
  _appendIframe() {
    this.container = document.createElement("div"), this.container.setAttribute("style", "z-index: 99999999999; width: 100%; height: 100%; overflow-y: auto; position: fixed; top: 0px; left: 0px; -webkit-overflow-scrolling: touch; line-height: 0;"), document.body.appendChild(this.container), this.iframe = document.createElement("iframe"), this.html.style.overflow = "hidden", this.body.style.overflow = "hidden", this.body.style.margin = "0", this.iframe.setAttribute("src", this.source), this.iframe.setAttribute("allowtransparency", "true"), this.iframe.setAttribute("frameborder", "none"), this.iframe.setAttribute("allow", "camera"), this.iframe.setAttribute("border", "0"), this.iframe.setAttribute("resize", "none"), this.iframe.setAttribute("id", "blockpass-kyc-web"), this.iframe.setAttribute("style", "z-index: 99999999999; width: 100%; height: 100%; overflow-x: hidden; overflow-y: auto; visibility: visible; margin: 0px; padding: 0px; border-color: transparent; border-width: 0; border-style: none; left: 0px; top: 0px; -webkit-tap-highlight-color: transparent;"), this.container.appendChild(this.iframe).focus()
  }
  _getEvents() {
    window.addEventListener("message", this._onIframeMessageHandler)
  }
  _deleteToken() {
    let e = new URL(this.source),
      t = new URLSearchParams(e.search.slice(1));
    t.delete("token"), e = this.url + "/?" + t, this.source = e.toString()
  }
  _initEventHandler() {
    this._onBtnClickHandler = (e => {
      this._appendIframe(), this._getEvents(), this._deleteToken()
    }), this._onIframeMessageHandler = (e => {
      if (!new URL("", e.origin).hostname.endsWith("blockpass.org")) return;
      const t = e.data || {};
      if ("KYCConnectSuccess" === t && "function" == typeof this.callbackKYCConnectSuccess && this.callbackKYCConnectSuccess(this.getProp(t, "payload.customData.extraData", {})), "KYCConnectCancel" === t && (this.stopKYCConnect(), "function" == typeof this.callbackKYCConnectCancel && this.callbackKYCConnectCancel()), "KYCConnectClose" === t && (this.stopKYCConnect(), "function" == typeof this.callbackKYCConnectClose && this.callbackKYCConnectClose()), "KYCConnectLoad" === t && "function" == typeof this.callbackKYCConnectLoad && this.callbackKYCConnectLoad(), "KYCConnectData" === t.event) {
        const e = this.getProp(t, "payload", {});
        "function" == typeof this.callbackKYCConnectData && this.callbackKYCConnectData(e)
      }
    })
  }
  getProp(e, t, n) {
    return (e = e[(t = Array.isArray(t) ? t : t.split("."))[0]]) && t.length > 1 ? this.getProp(e, t.slice(1)) : void 0 === e ? n : e
  }
}
export default BlockpassKYCConnect;