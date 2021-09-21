interface Navigator
{
    account? : (data? : string) => Promise<void>;
}