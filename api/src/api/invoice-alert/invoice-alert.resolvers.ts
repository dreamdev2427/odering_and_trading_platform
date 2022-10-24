import { Resolver, Query, Authorized, Ctx, Int, Arg, Mutation } from 'type-graphql';
import { InvestorBuyPropertyAlert, InvestorInvoices as InvoiceAlert } from 'entities';
import { JWT_ROLE, Context } from 'core/context';
import { INVOICE_STATUS_TYPE } from 'entities/investor-invoices';

@Resolver()
class InvoiceAlertResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => [InvoiceAlert], {
    description: 'Get all unpaid investors invoice alerts',
  })
  investorInvoiceAlerts(@Ctx() { user }: Context): Promise<InvoiceAlert[]> {
    return InvoiceAlert.find({ investorID: user.ID, status: INVOICE_STATUS_TYPE.Unpaid });
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Delete an investor invoice alert',
  })
  async investorInvoiceAlertDelete(@Arg('ID', () => Int) ID: number): Promise<boolean> {
    const invoiceAlert = await InvoiceAlert.findOneOrFail(ID);
    await InvestorBuyPropertyAlert.delete({ ID: (await invoiceAlert?.buyAlert)?.ID });
    await InvoiceAlert.delete(ID);
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => InvoiceAlert, {
    description: 'Get a specific investors invoice alert',
  })
  investorInvoiceAlert(
    @Ctx() { user }: Context,
    @Arg('ID', () => Int) ID: number,
  ): Promise<InvoiceAlert> {
    return InvoiceAlert.findOneOrFail({
      investorID: user.ID,
      status: INVOICE_STATUS_TYPE.Unpaid,
      ID: ID,
    });
  }
}

export default InvoiceAlertResolvers;
