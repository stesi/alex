//  Copyright 2018 Kolushov Alexandr <https://it-projects.info/team/KolushovAlexandr>
//  License MIT (https://opensource.org/licenses/MIT).
odoo.define("pos_invoice_pay.tour", function (require) {
    var tour = require("web_tour.tour");
    var core = require("web.core");
    var _t = core._t;

    function open_pos_neworder() {
        return [
            {
                trigger: ".o_pos_kanban button.oe_kanban_action_button",
                content: _t(
                    "<p>Click to start the point of sale interface. It <b>runs on tablets</b>, laptops, or industrial hardware.</p><p>Once the session launched, the system continues to run without an internet connection.</p>"
                ),
                position: "bottom",
            },
            {
                content: "waiting for loading to finish",
                trigger: ".pos-branding",
            },
            {
                content: "Switch to table or make dummy action",
                trigger: ".table, .pos-branding",
                position: "bottom",
                timeout: 20000,
            },
        ];
    }

    function select_invoice() {
        return [
            {
                content: "Open Invoices",
                trigger: '.control-buttons .control-button:contains("Fetch Invoices")',
            },
            {
                content: "Choose Administrator",
                trigger:
                    '.modal-dialog:not(.oe_hidden) .popup-selection .selection-item:contains("Mitchell Admin"), .invoice-list-screen:not(".oe_hidden") .list thead:first()',
            },
            {
                content: "Select Invoice",
                trigger: ".invoice-list-screen .list-contents tr.invoice:first",
            },
            {
                content: "Click next",
                trigger: ".invoice-list-screen .button.next.highlight",
            },
        ];
    }

    function max_payment(pay_method) {
        return [
            {
                extra_trigger:
                    '.button.paymentmethod:contains("' + pay_method + '"):last',
                trigger: '.button.paymentmethod:contains("' + pay_method + '")',
                content: _t("Click the payment method"),
            },
            {
                trigger: 'div.button.next:contains("Validate")',
                content: "Validate",
            },
            {
                trigger: 'div.button.next:contains("New Order")',
                content: "Validate",
            },
        ];
    }

    var steps = [
        tour.stepUtils.showAppsMenuItem(),
        {
            trigger: '.o_app[data-menu-xmlid="point_of_sale.menu_point_root"]',
            content: _t(
                "Ready to launch your <b>point of sale</b>? <i>Click here</i>."
            ),
            position: "right",
            edition: "community",
        },
        {
            trigger: '.o_app[data-menu-xmlid="point_of_sale.menu_point_root"]',
            content: _t(
                "Ready to launch your <b>point of sale</b>? <i>Click here</i>."
            ),
            position: "bottom",
            edition: "enterprise",
        },
    ];

    steps = steps.concat(open_pos_neworder());
    steps = steps.concat(select_invoice());
    steps = steps.concat(max_payment("Cash"));

    tour.register("tour_pos_invoice_pay", { test: true, url: "/web" }, steps);
});
