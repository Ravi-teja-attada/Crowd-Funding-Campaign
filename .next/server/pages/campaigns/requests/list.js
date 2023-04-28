"use strict";
(() => {
var exports = {};
exports.id = 414;
exports.ids = [414];
exports.modules = {

/***/ 424:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ list)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(831);
// EXTERNAL MODULE: ./routes.js
var routes = __webpack_require__(215);
// EXTERNAL MODULE: ./components/Layout.js + 1 modules
var Layout = __webpack_require__(544);
// EXTERNAL MODULE: ./ethereum/Campaign.js + 1 modules
var Campaign = __webpack_require__(392);
// EXTERNAL MODULE: ./ethereum/web3.js
var web3 = __webpack_require__(508);
;// CONCATENATED MODULE: ./components/RequestRow.js






function RequestRow(props) {
    const { Row , Cell  } = external_semantic_ui_react_.Table;
    async function onApprove() {
        const campaign = new Campaign/* default */.Z(props.address);
        const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
        await campaign.methods.approveRequest(props.id).send({
            from: accounts[0]
        });
        routes.Router.pushRoute(`/campaigns/${props.address}`);
    }
    async function onFinalize() {
        const campaign = new Campaign/* default */.Z(props.address);
        const accounts = await web3/* default.eth.getAccounts */.Z.eth.getAccounts();
        await campaign.methods.finalizeRequest(props.id).send({
            from: accounts[0]
        });
        routes.Router.pushRoute(`/campaigns/${props.address}`);
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Row, {
        disabled: props.request.completed,
        positive: props.request.approvalCount > props.approversCount / 2 && !props.request.completed,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: props.id
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: props.request.description
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: web3/* default.utils.fromWei */.Z.utils.fromWei(props.request.value, "ether")
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: props.request.recipient
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Cell, {
                children: [
                    props.request.approvalCount,
                    "/",
                    props.approversCount
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: props.request.completed ? null : /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                    color: "green",
                    onClick: onApprove,
                    children: "Approve"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Cell, {
                children: props.request.completed ? null : /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                    color: "teal",
                    onClick: onFinalize,
                    children: "Finalize"
                })
            })
        ]
    });
}
/* harmony default export */ const components_RequestRow = (RequestRow);

;// CONCATENATED MODULE: ./pages/campaigns/requests/list.js







function List({ address  }) {
    const campaign = (0,Campaign/* default */.Z)(address);
    const { Header , Row , HeaderCell , Cell , Body  } = external_semantic_ui_react_.Table;
    const { 0: requests , 1: setRequests  } = (0,external_react_.useState)([]);
    const { 0: approversCount , 1: setApproversCount  } = (0,external_react_.useState)();
    (0,external_react_.useEffect)(()=>{
        async function getRequests() {
            const approverCount = await campaign.methods.approversCount().call();
            const requestsCount = await campaign.methods.getRequestsCount().call();
            const requestList = await Promise.all(Array(parseInt(requestsCount)).fill().map((element, index)=>{
                return campaign.methods.requests(index).call();
            }));
            setRequests(requestList);
            setApproversCount(approverCount);
        }
        getRequests();
    }, []);
    function renderRows() {
        return requests.map((request, index)=>{
            return /*#__PURE__*/ jsx_runtime_.jsx(components_RequestRow, {
                id: index,
                request: request,
                address: address,
                approversCount: approversCount
            }, index);
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Layout/* default */.Z, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(routes.Link, {
                route: `/campaigns/${address}/requests/new`,
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_semantic_ui_react_.Button, {
                        primary: true,
                        children: "Add Request"
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_semantic_ui_react_.Table, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Header, {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Row, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "ID"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Description"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Amount"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Recipient"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Approval Count"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Approve"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(HeaderCell, {
                                    children: "Finalize"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Body, {
                        children: renderRows()
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                children: [
                    "Found ",
                    requests.length,
                    " requests"
                ]
            })
        ]
    });
}
List.getInitialProps = async (ctx)=>{
    return {
        address: ctx.query.address
    };
};
/* harmony default export */ const list = (List);


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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [184,392], () => (__webpack_exec__(424)));
module.exports = __webpack_exports__;

})();