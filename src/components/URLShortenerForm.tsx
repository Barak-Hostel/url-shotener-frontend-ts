import axios from "axios";
import { useState, useRef } from "react";
import { SERVER_ENDPOINTS } from "../config";
import "./URLShortenerForm.css";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CopyToClipboard from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
  
function URLShortenerForm() {
  const [destination, setDestination] = useState();
  const divRef = useRef<HTMLAnchorElement>(null);
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShortUrl(null);
    const result = await axios
      .post(`${SERVER_ENDPOINTS}/api/url`, {
        destination,
      })
      .then((resp) => resp.data)
      .catch((err) => {
        toast.error("Please enter a valid url.");
      });

    setShortUrl(result);
  }
  var finalURL = `${window.location.origin}/${shortUrl?.shortId}`;
  const text = () => {
    toast.success("Copied!");
  };

  return (
    <>
      <div className="outer">
        <div>
          <Toaster />
        </div>
        <div className="head-div">
          <p className="head">
            Shorten <span>URLs</span>
          </p>
        </div>
        <div className="outer">
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Enter a URL"
              onChange={(e: any) => setDestination(e.target.value)}
            />
            <button type="submit" className="button">
              Create!
            </button>
          </form>
        </div>

        {shortUrl && (
          <div className="link-div">
            <p className="link">
              <span>
                <a
                  href={`/${shortUrl?.shortId}`}
                  target="_blank"
                  rel="noreferrer"
                  ref={divRef}
                >
                  {window.location.origin}/{shortUrl?.shortId}
                </a>
              </span>
            </p>
            <CopyToClipboard text={finalURL}>
              <ContentCopyRoundedIcon className="copyBtn" onClick={text} />
            </CopyToClipboard>
          </div>
        )}
        <div className="name-div">
          <p className="name">
            Crafted by
            <a
              href="https://www.adityasingh.xyz/"
              target="_blank"
              rel="noreferrer"
            >
              <span> Aditya</span>.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default URLShortenerForm;
