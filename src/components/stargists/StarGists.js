import React, { useState, useEffect } from "react";
import { getStaredGists } from "../../utils/fetchAPIs";
import Loader from "../common/spinner/Spinner";
import {
  Table,
  Th,
  Td,
  UserNameSection,
  Img,
  Username,
  Icons,
  GistIcons,
} from "../common/table/style";

const StaredGists = () => {
  const [staredGists, setStaredGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const date = new Date("2021-01-09T14:56:23");

  const getStared = async () => {
    setLoading(true);
    let val = await getStaredGists().then((data) => {
      setStaredGists(data);
      setLoading(false);
    });
  };
  const showUniqueGistRecord = (id) => {
    console.log(id);
  };

  useEffect(() => {
    getStared();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section style={{ marginTop: "100px" }}>
          <Table>
            <thead>
              <tr>
                <Th>
                  <input type="checkbox" />
                </Th>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Keyword</Th>
                <Th>Notebook Name</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {staredGists
                ? staredGists.map((gist, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        showUniqueGistRecord(gist?.id);
                      }}
                    >
                      <Td>
                        {" "}
                        <input type="checkbox" />{" "}
                      </Td>
                      <Td>
                        <UserNameSection>
                          <span>
                            {" "}
                            <Img
                              className="profile-img"
                              src={gist?.owner?.avatar_url}
                              alt="Profile Pics"
                            />
                          </span>
                          <Username>{gist?.owner?.login}</Username>
                        </UserNameSection>
                      </Td>
                      <Td>{date.toLocaleDateString()}</Td>
                      <Td>{date.toLocaleTimeString()}</Td>
                      <Td>{Object.keys(gist?.files)[0]}</Td>
                      <Td>{gist?.description}</Td>
                      <Td>
                        <GistIcons>
                          <Icons className="fas fa-star" />
                          <Icons className="fas fa-code-branch" />
                        </GistIcons>
                      </Td>
                    </tr>
                  ))
                : "No Stared Gists Found there"}
            </tbody>
          </Table>
        </section>
      )}
    </>
  );
};

export default StaredGists;
