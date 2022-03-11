import { gql, UserInputError} from 'apollo-server'
import { Context } from './context'
const moment = require("moment")

export const typeDefs = gql`

  type Transaction {
    real_id:         Int!
    id:              String
    account:         String
    description:     String
    category:        String
    reference:       String
    currency:        String
    amount:          String
    status:          String
    transactionDate: String
    createdAt:       String
    updatedAt:       String
  }

  type Query {
    allTransactions: [Transaction!]!
    rangedTransactions(
      lowerLimit: String!
      upperLimit: String!  
    ): [Transaction]
  }

`

export const resolvers = {
  Query: {
    allTransactions: (_parent, _args, context: Context) => {
      return context.prisma.transaction.findMany({
        orderBy: [
          {
            transactionDate: 'asc'
          }
        ]
      })
    },
    rangedTransactions: (_parent, args: { lowerLimit: string, upperLimit: string }, context: Context) => {
      let lowerLimit = new Date(args.lowerLimit)
      let upperLimit = new Date(args.upperLimit)
      if(moment(lowerLimit).isAfter(moment(upperLimit))) {
        throw new UserInputError("The lower limit date must be before the upper limit date")
      }
      return context.prisma.transaction.findMany({
        where: {
          transactionDate: {
            gte: new Date(args.lowerLimit),
            lte: new Date(args.upperLimit)
          }
        },
        orderBy: [
          {
            transactionDate: 'asc'
          }
        ]
      })
    },
  },
}
