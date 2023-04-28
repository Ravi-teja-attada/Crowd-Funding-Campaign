"use strict";
(() => {
var exports = {};
exports.id = 634;
exports.ids = [634];
exports.modules = {

/***/ 569:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ show)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./components/Layout.js + 1 modules
var Layout = __webpack_require__(544);
// EXTERNAL MODULE: ./ethereum/Campaign.js + 1 modules
var Campaign = __webpack_require__(392);
// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(831);
// EXTERNAL MODULE: ./ethereum/web3.js
var web3 = __webpack_require__(508);
// EXTERNAL MODULE: ./routes.js
var routes = __webpack_require__(215);
;// CONCATENATED MODULE: ./components/Contribute.js






function Contribute(props) {
    const { 0: input , 1: setInput  } = (0,external_react_.useState)("");
    const { 0: loading , 1: setLoading  } = (0,external_react_.useState)(false);
    const { 0: message , 1: setMessage  } = (0,external_react_.useState)("");
    async function submit(event) {
        event.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const campaign = new Campaign/* default */.Z(props.address);
            const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3/* default.utils.toWei */.Z.utils.toWei(input, "ether")
            });
            routes.Router.replaceRoute(`/campaigns/${props.address}`);
        } catch (err) {
            setMessage(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Message, {
                negative: true,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Message.Header, {
                        children: "Oops!!"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: err.message
                    })
                ]
            }));
            setInput("");
        }
        setLoading(false);
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Form, {
        onSubmit: submit,
        error: !!message,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Form.Field, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        children: "Amount to Contribute"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Input, {
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        label: "ether",
                        labelPosition: "right",
                        placeholder: "Enter amount"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                loading: loading,
                primary: true,
                children: "Contribute"
            }),
            message
        ]
    });
}
/* harmony default export */ const components_Contribute = (Contribute);

;// CONCATENATED MODULE: ./pages/campaigns/show.js








class CampaignShow extends external_react_.Component {
    static async getInitialProps(props) {
        const campaign = (0,Campaign/* default */.Z)(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log("ok");
        console.log(summary);
        return {
            address: props.query.address,
            balance: summary[0],
            minContribution: summary[1],
            requestsLength: summary[2],
            approversCount: summary[3],
            owner: summary[4]
        };
    }
    displayCard() {
        const { balance , minContribution , requestsLength , approversCount , owner  } = this.props;
        const items = [
            {
                header: owner,
                meta: "Address of the Owner",
                description: "The Owner created this campaign and can create requests to wothdraw money",
                style: {
                    overflowWrap: "break-word"
                }
            },
            {
                header: minContribution,
                meta: "Minimum Contribution (wei)",
                description: "This is the minimum amount of wei you must contribute to become an approver",
                style: {
                    overflowWrap: "break-word"
                }
            },
            {
                header: web3/* default.utils.fromWei */.Z.utils.fromWei(balance, "ether"),
                meta: "Balance of this campaign (ether)",
                description: "Amount of ether left to be spend by the owner of this campaign",
                style: {
                    overflowWrap: "break-word"
                }
            },
            {
                header: requestsLength,
                meta: "Number of active requests",
                description: "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
                style: {
                    overflowWrap: "break-word"
                }
            },
            {
                header: approversCount,
                meta: "Number of approvers",
                description: "Number of people who have already donated to the campaign",
                style: {
                    overflowWrap: "break-word"
                }
            }
        ];
        return /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Card.Group, {
            items: items
        });
    }
    render() {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Layout/* default */.Z, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                    children: "Its working"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Grid, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.GridRow, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Column, {
                                    width: 10,
                                    children: this.displayCard()
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Grid.Column, {
                                    width: 6,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(components_Contribute, {
                                        address: this.props.address
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.GridRow, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.GridColumn, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(routes.Link, {
                                    route: `/campaigns/${this.props.address}/requests`,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                                            primary: true,
                                            content: "view requests"
                                        })
                                    })
                                })
                            })
                        })
                    ]
                })
            ]
        });
    }
}
/* harmony default export */ const show = (CampaignShow);


/***/ }),

/***/ 662:
/***/ ((module) => {

module.exports = require("next-routes");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 831:
/***/ ((module) => {

module.exports = require("semantic-ui-react");

/***/ }),

/***/ 519:
/***/ ((module) => {

module.exports = require("web3");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [184,392], () => (__webpack_exec__(569)));
module.exports = __webpack_exports__;

})();