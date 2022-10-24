import { InputType, Field } from 'type-graphql';
import { IsInt, IsString, IsDate, IsEthereumAddress, IsNumber, IsPositive } from 'class-validator';

import { BlockchainSharesTransferTransactions } from 'entities';

@InputType({ description: 'Investor blockchain share transaction create data' })
export class BlockchainSharesTransferTransactionsInput
  implements Partial<BlockchainSharesTransferTransactions>
{
  @Field()
  @IsEthereumAddress()
  toAddress: string;

  @Field({ nullable: true })
  @IsInt()
  @IsPositive()
  stoID: number;

  @Field()
  @IsInt()
  @IsPositive()
  adminID: number;

  @Field({ nullable: true })
  @IsInt()
  @IsPositive()
  investorID: number;

  @Field()
  @IsInt()
  @IsPositive()
  shareTypeID: number;

  @Field()
  @IsNumber()
  @IsPositive()
  amountToSend: number;

  @Field({ nullable: true })
  @IsString()
  investmentDetails: string;

  @Field()
  @IsNumber()
  investmentAmount: number;

  @Field()
  @IsInt()
  reduceInvestorBalance: number;

  @Field()
  @IsInt()
  status: number;

  @Field()
  @IsDate()
  recordDate: Date;
}
