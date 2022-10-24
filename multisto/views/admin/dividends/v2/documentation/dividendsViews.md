# Dividends Module Views

## Structure

* [dividendsIndex](../dividendsIndex.hbs) Main page
* [newDividendModal](../newDividendModal.hbs) Input for new dividend template
* [dividend](../dividend.hbs) Individual dividend template and payouts history
* [dividendPayoutsModal](../dividendPayoutsModal.hbs) Investor payout records for a specific dividend payout

The module relies on some archaic functions to display modals. The modal display calls are described in the functions in **dividendsIndex**

The module uses the popular JS library DataTables to display some of the data. 

The module uses a new custom error outlining feature, via the [**{{> validationBackend}}**](/views/partials/validationBackend.hbs) partial.
Try following the link to learn about it.

See [**Module Documentation**](/src/services/investors/dividends/documentation/dividends.md#controllers)