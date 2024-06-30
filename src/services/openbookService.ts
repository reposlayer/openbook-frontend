// File: src/services/openbookService.ts
import { 
    Connection, 
    PublicKey, 
    Transaction, 
    SystemProgram, 
    SYSVAR_RENT_PUBKEY, 
    Keypair
  } from '@solana/web3.js';
  import { Market, TOKEN_PROGRAM_ID, DexInstructions } from '@project-serum/serum';
  import { Token } from '@solana/spl-token';
  
  class OpenBookService {
    private connection: Connection;
    private programId: PublicKey;
  
    constructor(rpcEndpoint: string, programId: string) {
      this.connection = new Connection(rpcEndpoint);
      this.programId = new PublicKey(programId);
    }
  
    async getMarkets(): Promise<Market[]> {
     // HARCODED
      const marketAddresses = [
        'GvWbh6R2aVPhfdMftXoiWvEit2poCpJt1PrVZ5LWBXVi',
        'CMxieHNoWYgF5c6wS1yz1bxYYkuYbZzCXKhzXTZkx6Rn',
        // Add more market addresses as needed
      ];
  
      const markets = await Promise.all(
        marketAddresses.map(async (address) => {
          const marketAddress = new PublicKey(address);
          return await Market.load(this.connection, marketAddress, {}, this.programId);
        })
      );
  
      return markets;
    }
  
    async createMarket(
      payer: Keypair,
      baseMint: PublicKey,
      quoteMint: PublicKey,
      baseLotSize: number,
      quoteLotSize: number,
      feeRateBps: number
    ): Promise<string> {
      const marketKeypair = new Keypair();
      const requestQueueKeypair = new Keypair();
      const eventQueueKeypair = new Keypair();
      const bidsKeypair = new Keypair();
      const asksKeypair = new Keypair();
  
      const [marketAuthority, marketAuthorityBump] = await PublicKey.findProgramAddress(
        [marketKeypair.publicKey.toBuffer()],
        this.programId
      );
  
      const baseVaultAccount = await Token.getAssociatedTokenAddress(
        TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        baseMint,
        marketAuthority,
        true
      );
      
      const quoteVaultAccount = await Token.getAssociatedTokenAddress(
        TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        quoteMint,
        marketAuthority,
        true
      );
  
      const transaction = new Transaction();
  
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: payer.publicKey,
          newAccountPubkey: marketKeypair.publicKey,
          lamports: await this.connection.getMinimumBalanceForRentExemption(Market.getLayout(this.programId).span),
          space: Market.getLayout(this.programId).span,
          programId: this.programId,
        }),
        SystemProgram.createAccount({
          fromPubkey: payer.publicKey,
          newAccountPubkey: requestQueueKeypair.publicKey,
          lamports: await this.